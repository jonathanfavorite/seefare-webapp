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

export default function DashBoardScreen() {
  const destinationManager = new DestinationService();
  const loadingCtx = useContext(LoadingContext);
  const appCtx = useContext(AppContext);

  const hiddenSliderRef = createRef<HTMLDivElement>();
  const draggableSliderRef = createRef<HTMLDivElement>();

  const [hiddenSliderHeight, setHiddenSliderHeight] = useState(0);
  const [draggableSliderHeight, setDraggableSliderHeight] = useState(0);

  const [mouseDown, setMouseDown] = useState(false);

  function handleDraggableMouseDownEvent(e: React.MouseEvent) {
    if (draggableSliderRef.current) {
      setMouseDown(true);
      console.log("mousedown")
    }
  }
  function handleDraggableMouseUpEvent(e: React.MouseEvent) {
    if (draggableSliderRef.current) {
     
      setMouseDown(false);
      console.log("mouseupn")
    }
  }

  useEffect(() => {
    if(hiddenSliderRef.current && draggableSliderRef.current) {
      console.log("hey");
      hiddenSliderRef.current.style.height = draggableSliderRef.current.offsetHeight - 30 + "px";
    }
  }, [draggableSliderRef.current?.offsetHeight]);

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
          <div className="maps-content">
            <Map />
          </div>

          <div className="hidden-slider-wrap" ref={hiddenSliderRef}></div>
          <div
            className="draggable-slider-wrap"
            onMouseDown={handleDraggableMouseDownEvent}
            onMouseUp={handleDraggableMouseUpEvent}
            ref={draggableSliderRef}
          >
            <div className="content">
              <div className="slider-grip"></div>
              {!loadingCtx.loading && <SearchForm />}
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
