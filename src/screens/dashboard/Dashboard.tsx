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

export default function DashBoardScreen() {
  const destinationManager = new DestinationService();
  const loadingCtx = useContext(LoadingContext);
  const appCtx = useContext(AppContext);
  const mapCtx = useContext(MapContext);

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
    if(mapCtx.startPathfinding != 0)
    {
      console.log("lets go");
    } 
  }, [mapCtx.startPathfinding]);

  
  const geocoder = new google.maps.Geocoder();

  const handleCheckMarkClick = () => {
    let currentPos = mapCtx.map.getCenter();
    console.log(currentPos.lat(), currentPos.lng());

    let latAdjustment = currentPos.lat() - 0.000025;
    let finalPosition = { lat: latAdjustment, lng: currentPos.lng() };


    geocoder.geocode(
      {
        location: finalPosition,
      },
      function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results && results[0]) {
            //mapCtx.updateSearchFromText(results[0].formatted_address);
            let coords : LatLngModel = {
              lat: finalPosition.lat,
              lng: finalPosition.lng
            }
            if(mapCtx.searchFromText == "")
            {
              
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
                ) : (<>
                  <span>Click here when finished</span>
                  <div className="checkmark" onClick={handleCheckMarkClick}>
                    
                    <CheckMark />
                  </div>
                  </>
                )}
              </div>
            </div>

            <div className="pin-drop-wrap">
            {mapCtx.toggleCustomPin && <div className="hole"></div> }
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
            <div className="content">
              <div
                className="slider-grip-wrap"
                ref={draggableSliderGripRef}
                onTouchStart={swipeHook.onTouchStart}
                onTouchMove={swipeHook.onTouchMove}
                onTouchEnd={swipeHook.onTouchEnd}
              >
                <div className="slider-grip"></div>

               {(!loadingCtx.loading && mapCtx.startPathfinding == 0) && <SearchForm />} 
              </div>
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
