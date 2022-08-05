import React, { useContext, useEffect } from "react";
import GoButton from "../../components/go-button/GoButton";
import RotatingBoat from "../../components/icons/RotatingBoat";
import FullScreenLoading from "../../components/loading/full-screen-loading/FullScreenLoading";
import Logo from "../../components/logo/Logo";
import { AppContext } from "../../contexts/AppContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import {
  DestinationModel,
  DestinationTag,
} from "../../models/DestinationModel";
import DestinationService from "../../services/api/destination.service";
import "./WelcomeSplash.scss";

export default function WelcomeSplash() {
  const appContext = useContext(AppContext);
  const loadingCtx = useContext(LoadingContext);
  const destinationManager = new DestinationService();

  async function FetchAll() {
    if(appContext.destinations.length === 0 && appContext.tags.length === 0) {
    loadingCtx.UpdateLoading(true);
    await FetchDestinations();
    await FetchTags();
    loadingCtx.UpdateLoading(false);
    }
  }

  async function FetchDestinations() {
    loadingCtx.UpdateLoadingText("Loading Destinations...");
    const getDestinations = await destinationManager
      .GetAllDestinations()
      .then((d) => {
        if (d.success) {
          appContext.UpdateDestinations([]);
          let destinations: DestinationModel[] = [];
          for (let i = 0; i < d.data.length; i++) {
            let newDest: DestinationModel = {
              id: d.data[i].id,
              name: d.data[i].name,
            };
            destinations.push(newDest);
          }
          appContext.UpdateDestinations(destinations);
        } else {
          loadingCtx.UpdateLoadingText("Error Loading Destinations");
        }
      });
  }
  async function FetchTags() {
    loadingCtx.UpdateLoadingText("Loading Tags...");
    const getTags = await destinationManager.GetAllTags().then((d) => {
      if (d.success) {
        appContext.UpdateTags([]);
        let tags: DestinationTag[] = [];
        for (let i = 0; i < d.data.tags.length; i++) {
          let newTag: DestinationTag = {
            id: d.data.tags[i].id,
            name: d.data.tags[i].name,
          };
          tags.push(newTag);
        }
        appContext.UpdateTags(tags);
      } else {
        loadingCtx.UpdateLoadingText("Error Loading Tags");
      }
    });
  }

  useEffect(() => {
    FetchAll();
  }, []);

  function handleGoButtonClick() {
    appContext.UpdateCurrentScreen("explore");
  }

  return (
    <>
    {/* {loadingCtx.loading && <FullScreenLoading />} */}
      <div id="welcome-splash-container">
        <div id="welcome-splash-content">
          <div id="top-content"></div>

          <div id="logo_wrap">
            <Logo />
          </div>

          <div id="destination-wrap">
            <div id="title">Selected Location</div>
            <div id="dropdown">
              <div id="text">Cape Coral, FL</div>
              <div id="arrow">▼</div>
            </div>
          </div>

          <div id="didyouknow-wrap">
            <div id="content">
              <div id="title">
                Do you know what a <strong>Knot</strong> is?
              </div>
              <div id="description">
                One knot is a speed of one nautical mile per hour or 1.852km/hr.
              </div>
            </div>
          </div>

          <div id="go_wrap">
            {loadingCtx.loading ? (
            <div className="waiting-go">
              <RotatingBoat size={100} />
              <div className="text">{loadingCtx.loadingText}</div>
            </div>
            ) : (
            <GoButton link="dashboard/" onClick={handleGoButtonClick} />
            )}
          </div>

          <div id="undergo_wrap"></div>

          <div id="bottom-content">
            <div id="disclaimer">
              This application is currently in beta testing, navigation results
              may not be valid. Do not use this app as a navigation tool.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
