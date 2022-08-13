import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import "./MapWrapper.scss";
import { AppContext } from "../../../contexts/AppContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { MapContext } from "../../../contexts/MapContext";
import useVerticalSwipe from "../../../hooks/useVerticalSwipe";
import {
    DestinationModel,
    DestinationTag,
} from "../../../models/DestinationModel";
import LatLngModel from "../../../models/LatLngModel";
import { CheckMark } from "../../atoms/icons/Icons";
import { PinIcon } from "../../atoms/icons/NavigationIcons";
import Map from "../../atoms/map/Map";
import PathfindingResults from "../../atoms/pathfinding/pathfinding-results/PathfindingResults";
import ProcessingBox from "../../atoms/pathfinding/processing/ProcessingBox";
import SearchForm from "../../atoms/pathfinding/search-form/SearchForm";
import { PathfindModel, PathFindTimes } from "../../../models/PathfindModel";
import { MarkerModel, MarkerType } from "../../../models/MarkerModel";
import DrawingManager from "../../../managers/DrawingManager";
import PathfindService from "../../../services/pathfind.service";

function MapWrapper() {
    const loadingCtx = useContext(LoadingContext);
    const appCtx = useContext(AppContext);
    const mapCtx = useContext(MapContext);
    const [originalDraggableHeight, setOriginalDraggableHeight] = useState(0);

    let tempHouseMarker : google.maps.Marker[] = [];

    const mapContentRef = useRef<HTMLDivElement>(null);
    const hiddenSliderRef = createRef<HTMLDivElement>();
    const draggableSliderRef = createRef<HTMLDivElement>();
    const draggableSliderGripRef = createRef<HTMLDivElement>();

    const swipeHook = useVerticalSwipe(draggableSliderGripRef);

    const handleCheckMarkClick = () => {
     
      //console.log("~~ HERE", tempHouseMarker);
        for(let i = 0; i < tempHouseMarker.length; i++) {
            tempHouseMarker[i].setMap(null);
            // remove from arra
            tempHouseMarker.splice(i, 1);
        }

       // mapCtx.resetSearch();
      
        let currentPos = mapCtx.map.getCenter();
        console.log(currentPos.lat(), currentPos.lng());

        let latAdjustment = currentPos.lat() - 0.000025;
        let finalPosition = { lat: latAdjustment, lng: currentPos.lng() };

        let pin = new google.maps.Marker({
            position: finalPosition,
            map: mapCtx.map,
            icon: {
                url: "../../images/markers/house.png",
                scaledSize: new google.maps.Size(40, 40),
            },
        });

        tempHouseMarker.push(pin);
        console.log(tempHouseMarker);

        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(
            {
                location: finalPosition,
            },
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results && results[0]) {
                        //mapCtx.updateSearchFromText(results[0].formatted_address);
                        let coords: LatLngModel = {
                            lat: finalPosition.lat,
                            lng: finalPosition.lng,
                        };
                        if (mapCtx.searchFromText == "") {
                            mapCtx.updateSearchFromText(
                                results[0].formatted_address
                            );
                        }

                        mapCtx.updateSearchFromCoords(coords);
                    } else {
                        window.alert("No results found");
                    }
                } else {
                    window.alert("Geocoder failed due to: " + status);
                }
            }
        );
    };

    useEffect(() => {
        if (swipeHook.swipedUp) {
            swipedUp();
        }
        if (swipeHook.swipedDown) {
            swipedDown();
        }
    }, [swipeHook.swipedUp]);

    function swipedUp() {
        if (draggableSliderRef.current && mapContentRef.current) {
            const mapsize = mapContentRef.current.offsetHeight * 1;
            draggableSliderRef.current.style.height = 90 + "%";
        }
    }
    function swipedDown() {
        if (draggableSliderRef.current) {
            draggableSliderRef.current.style.height =
                originalDraggableHeight + "px";
        }
    }

    useEffect(() => {
        if (hiddenSliderRef.current && draggableSliderRef.current) {
            setOriginalDraggableHeight(draggableSliderRef.current.offsetHeight);
            hiddenSliderRef.current.style.height =
                draggableSliderRef.current.offsetHeight - 30 + "px";
            draggableSliderRef.current.style.height =
                draggableSliderRef.current.offsetHeight + "px";
        }
    }, []);

    useEffect(() => {
        appCtx.UpdateCurrentScreen("explore");
        if (appCtx.destinations.length === 0) {
            let exampleDestination: DestinationModel = {
                id: 1,
                name: "Example Destination",
            };
            appCtx.UpdateDestinations([exampleDestination]);
        }
        if (appCtx.tags.length === 0) {
            let exampleTag: DestinationTag = {
                id: 1,
                name: "Example Tag",
            };
            appCtx.UpdateTags([exampleTag]);
        }

        //SetDraggableView(<SearchForm />);
    }, []);

    const drawingManager = new DrawingManager(mapCtx.map, mapCtx.searchToID);

    useEffect(() => {
        if (mapCtx.startPathfinding != 0) {
            console.log("lets go");
            Pathfind();
        }
    }, [mapCtx.startPathfinding]);

    function handlePathfindInfo(info: any) {
        console.log(info);
      //  drawingManager.clearPolyLines();
        let tmpMarkers: MarkerModel[] = [];

        let houseMarker: MarkerModel = {
            id: 0,
            position: mapCtx.searchFromCoords,
            speed: 5,
            type: MarkerType.House,
            destinationID: 0,
            subDestinationID: 0,
        };

        tmpMarkers.push(houseMarker);

        for (let i = 0; i < info.data.results.length; i++) {
            let thisMarker = info.data.results[i];
            let newMarker: MarkerModel = {
                id: thisMarker.id,
                position: { lat: thisMarker.lat, lng: thisMarker.lng },
                speed: thisMarker.speed ? thisMarker.speed : 5,
                type: thisMarker.type,
                destinationID: thisMarker.destinationID,
                subDestinationID: thisMarker.subDestinationID,
            };
            tmpMarkers.push(newMarker);
        }

        let details = info.data.details;
        let Hours = details.hours.toFixed(2);
        let Minutes = details.minutes.toFixed(0);
        let Seconds = details.seconds.toFixed(0);
        // format the time
        let finalTime = "";
        let newHour = Math.floor(Hours);
        let newMinutes = Math.round(60 * (Hours - Math.floor(Hours)));
        if (newHour > 0) {
            finalTime += newHour + (newHour == 1 ? " hour " : " hours ");
        }
        if (newMinutes >= 1) {
            finalTime +=
                newMinutes + (newMinutes == 1 ? " minute " : " minutes ");
        }

        let pathfindTime: PathFindTimes = {
            hours: newHour,
            minutes: newMinutes,
            seconds: Seconds,
            timeText: finalTime,
        };

        let final: PathfindModel = drawingManager.run(tmpMarkers);
        final.times = pathfindTime;
        final.miles = details.totalDistance;
        mapCtx.updatePathfindResults(final);
    }

    async function Pathfind() {
        const pathfindService = new PathfindService();
        await pathfindService
            .Pathfind(
                mapCtx.searchFromCoords.lat,
                mapCtx.searchFromCoords.lng,
                mapCtx.searchToID
            )
            .then((response) => {
                if (response.success) {
                    const responseText = response.data.response;
                    const results = response.data.results;
                    if (results) {
                        handlePathfindInfo(response);
                    } else {
                        console.log("no results");
                    }
                    console.log("responseText", responseText);
                } else {
                    console.log("error pathfinding");
                }
            });
    }

    return (
        <div className="maps-wrap">
            <div className="maps-content" ref={mapContentRef}>
                <div
                    className="pin-toggle-wrap"
                    onClick={() =>
                        mapCtx.updateCustomPin(!mapCtx.toggleCustomPin)
                    }
                >
                    <div className="toggle">
                        {!mapCtx.toggleCustomPin ? (
                            <div className="pin">
                                <PinIcon />
                            </div>
                        ) : (
                            <>
                                <span>Click here when finished</span>
                                <div
                                    className="checkmark"
                                    onClick={handleCheckMarkClick}
                                >
                                    <CheckMark />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="pin-drop-wrap">
                    {mapCtx.toggleCustomPin && <div className="hole"></div>}
                    {mapCtx.toggleCustomPin && (
                        <div className="pin">
                            <PinIcon />
                            Move me!
                        </div>
                    )}
                </div>

                <Map />
            </div>

            <div className="hidden-slider-wrap" ref={hiddenSliderRef}></div>
            <div className="draggable-slider-wrap" ref={draggableSliderRef}>
                <div
                    className="slider-grip-wrap"
                    ref={draggableSliderGripRef}
                    onTouchStart={swipeHook.onTouchStart}
                    onTouchMove={swipeHook.onTouchMove}
                    onTouchEnd={swipeHook.onTouchEnd}
                >
                    <div className="slider-grip"></div>
                </div>
                <div className="content">
                    {!loadingCtx.loading &&
                        mapCtx.startPathfinding == 0 &&
                        mapCtx.startPathfinding == 0 && <SearchForm />}
                    {mapCtx.startPathfinding != 0 &&
                        !mapCtx.pathfindResults && <ProcessingBox />}
                    {!loadingCtx.loading && mapCtx.pathfindResults && (
                        <PathfindingResults />
                    )}
                </div>
            </div>
        </div>
    );
}

export default MapWrapper;
