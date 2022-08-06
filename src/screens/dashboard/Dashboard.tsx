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

export default function DashBoardScreen() {
  const destinationManager = new DestinationService();
  const loadingCtx = useContext(LoadingContext);
  const appCtx = useContext(AppContext);

  const [originalDraggableHeight, setOriginalDraggableHeight] = useState(0);
  const mapContentRef = useRef<HTMLDivElement>(null);
  const hiddenSliderRef = createRef<HTMLDivElement>();
  const draggableSliderRef = createRef<HTMLDivElement>();
  const draggableSliderGripRef = createRef<HTMLDivElement>();

  const swipeHook = useVerticalSwipe(draggableSliderGripRef);

  const [mouseDown, setMouseDown] = useState(false);

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
      draggableSliderRef.current.style.height = draggableSliderRef.current.offsetHeight + "px";
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
  }, []);

  return (
    <div id="dashboard-screen-wrapper">
      {loadingCtx.loading && <FullScreenLoading />}

      <div className="dashboard-content">
        <Header />

        <TagList />

        <div className="maps-wrap">
          <div className="maps-content" ref={mapContentRef}>
            <Map />
          </div>

          <div className="hidden-slider-wrap" ref={hiddenSliderRef}></div>
          <div className="draggable-slider-wrap" ref={draggableSliderRef}>
            <div className="content">
              <div className="slider-grip-wrap" ref={draggableSliderGripRef}
              onTouchStart={swipeHook.onTouchStart}
              onTouchMove={swipeHook.onTouchMove}
              onTouchEnd={swipeHook.onTouchEnd}>
                <div
                  className="slider-grip"
                ></div>
             
              {!loadingCtx.loading && <SearchForm />}
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
