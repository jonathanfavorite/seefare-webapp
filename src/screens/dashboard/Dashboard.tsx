import React, {
  createRef,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import Map from "../../components/map/Map";
import FullScreenLoading from "../../components/loading/full-screen-loading/FullScreenLoading";
import {
  DestinationModel,
  DestinationTag,
} from "../../models/DestinationModel";
import { AppContext } from "../../contexts/AppContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import FooterNavigation from "../../components/footer-navigation/FooterNavigation";
import Header from "../../components/header/Header";
import SearchForm from "../../components/dashboard/search-form/SearchForm";
import DestinationService from "../../services/api/destination.service";
import TagList from "../../components/dashboard/tag-list/TagList";
import useVerticalSwipe from "../../hooks/useVerticalSwipe";
import { PinIcon } from "../../components/icons/NavigationIcons";
import { CheckMark } from "../../components/icons/Icons";
import { MapContext } from "../../contexts/MapContext";
import LatLngModel from "../../models/LatLngModel";
import ProcessingBox from "../../components/dashboard/search-form/processing/ProcessingBox";
import PathfindService from "../../services/api/pathfind.service";
import DrawingManager from "../../managers/DrawingManager";
import { MarkerModel, MarkerType } from "../../models/MarkerModel";
import { PathfindModel, PathFindTimes } from "../../models/PathfindModel";
import PathfindingResults from "../../components/dashboard/pathfinding/pathfinding-results/PathfindingResults";

export default function DashBoardScreen() {
  const destinationManager = new DestinationService();
  const loadingCtx = useContext(LoadingContext);
  const appCtx = useContext(AppContext);
  const mapCtx = useContext(MapContext);

  const drawingManager = new DrawingManager(mapCtx.map, mapCtx.searchToID);

  const [originalDraggableHeight, setOriginalDraggableHeight] = useState(0);
  const [currentDraggableView, setCurrentDraggableView] = useState(null);
  const mapContentRef = useRef<HTMLDivElement>(null);
  const hiddenSliderRef = createRef<HTMLDivElement>();
  const draggableSliderRef = createRef<HTMLDivElement>();
  const draggableSliderGripRef = createRef<HTMLDivElement>();

  const swipeHook = useVerticalSwipe(draggableSliderGripRef);

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
      draggableSliderRef.current.style.height = originalDraggableHeight + "px";
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

  function SetDraggableView(text: any) {
    setCurrentDraggableView(text);
  }

  useEffect(() => {
    if (mapCtx.startPathfinding != 0) {
      console.log("lets go");
      Pathfind();
    }
  }, [mapCtx.startPathfinding]);

  const geocoder = new google.maps.Geocoder();

  const handleCheckMarkClick = () => {
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
      }
    })

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
              mapCtx.updateSearchFromText(results[0].formatted_address);
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

  function handlePathfindInfo(info: any)
  {
    console.log(info);
    drawingManager.clearPolyLines();
    let tmpMarkers : MarkerModel[] = [];

    let houseMarker : MarkerModel = {
      id: 0,
      position: mapCtx.searchFromCoords,
      speed: 5,
      type: MarkerType.House,
      destinationID: 0,
      subDestinationID: 0
    };

    tmpMarkers.push(houseMarker);

    for(let i = 0; i < info.data.results.length; i++)
    {
      let thisMarker = info.data.results[i];
      let newMarker : MarkerModel = {
        id: thisMarker.id,
        position: { lat: thisMarker.lat, lng: thisMarker.lng },
        speed: thisMarker.speed ? thisMarker.speed : 5,
        type: thisMarker.type,
        destinationID: thisMarker.destinationID,
        subDestinationID: thisMarker.subDestinationID
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
    if(newHour > 0)
    {
        finalTime += newHour + (newHour == 1 ? " hour " : " hours ");
    }
    if(newMinutes >= 1)
    {
        finalTime += newMinutes + (newMinutes == 1 ? " minute " : " minutes ");
    }

    let pathfindTime : PathFindTimes = {
      hours: newHour,
      minutes: newMinutes,
      seconds: Seconds,
      timeText : finalTime
    }
   

    let final : PathfindModel = drawingManager.run(tmpMarkers);
    final.times = pathfindTime;
    final.miles = details.totalDistance;
    mapCtx.updatePathfindResults(final);

  }


  async function Pathfind() {
    const pathfindService = new PathfindService();
    await pathfindService.Pathfind(mapCtx.searchFromCoords.lat, mapCtx.searchFromCoords.lng, mapCtx.searchToID)
    .then((response) => {
    //  console.log("response", response);
      if(response.success)
      {
        //console.log("sucess", response.success);
        const responseText = response.data.response;
        const results = response.data.results;
        if(results)
        {
        //  console.log("RESULTCEPTION", response);
          handlePathfindInfo(response);
         
        }
        else
        {
          console.log("no results");
        }
        console.log("responseText", responseText);
      }
      else
      {
        console.log("error pathfinding");
      }
    })
  }
  return (
    <div id="dashboard-screen-wrapper">
      {loadingCtx.loading && <FullScreenLoading />}

      <div className="dashboard-content">
        <Header />

        <TagList />

        <div className="maps-wrap">
          <div className="maps-content" ref={mapContentRef}>
            <div
              className="pin-toggle-wrap"
              onClick={() => mapCtx.updateCustomPin(!mapCtx.toggleCustomPin)}
            >
              <div className="toggle">
                {!mapCtx.toggleCustomPin ? (
                  <div className="pin">
                    <PinIcon />
                  </div>
                ) : (
                  <>
                    <span>Click here when finished</span>
                    <div className="checkmark" onClick={handleCheckMarkClick}>
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
                className="slider-grip-wrap" ref={draggableSliderGripRef}
                onTouchStart={swipeHook.onTouchStart}
                onTouchMove={swipeHook.onTouchMove}
                onTouchEnd={swipeHook.onTouchEnd}>
                <div className="slider-grip"></div>

                
              </div>
            <div className="content"> 
            
              {!loadingCtx.loading && mapCtx.startPathfinding == 0 &&  mapCtx.startPathfinding == 0 && (
                  <SearchForm />
                )}
                {mapCtx.startPathfinding != 0 && !mapCtx.pathfindResults && (
                  <ProcessingBox />
                )}
                {!loadingCtx.loading && mapCtx.pathfindResults && (
                      <PathfindingResults />  
                )}
              
                
            </div>
          </div>
        </div>

        <div className="footer-navigation-wrap">
          <div className="content">
            <FooterNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}
