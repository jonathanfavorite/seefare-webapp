import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import {
  DestinationModel,
  DestinationTag,
} from "../../../models/DestinationModel";
import GoButton from "../../atoms/buttons/go-button/GoButton";
import AnimatedBoat from "../../atoms/icons/AnimatedBoat";
import DestinationService from "../../../services/destination.service";
import { DestinationTransformer } from "../../../managers/DestinationTransformer";
import "./WelcomeTemplate.scss";
import Logo from "../../atoms/logo/Logo";
import DidYouKnow from "../../atoms/did-you-know/DidYouKnow";
import { LocalStorageManager } from "../../../helpers/CheckLocalStorage";

export default function WelcomeTemplate() {
  const appContext = useContext(AppContext);
  const loadingCtx = useContext(LoadingContext);
  const destinationManager = new DestinationService();
  const destinationTransformer = new DestinationTransformer();

  async function FetchAll() {
    if (appContext.destinations.length === 0 && appContext.tags.length === 0) {
      loadingCtx.UpdateLoading(true);

      const getDestinations = await destinationManager.GetAllDestinations();
      const getTags = await destinationManager.GetAllTags();

      const promises = Promise.all([getDestinations, getTags])
        .then((values) => {

          const [destinations, tags] = values;

          if (destinations.success) {
            let new_destinations: DestinationModel[] = [];
            for (let i = 0; i < destinations.data.length; i++) {
              let newDest: DestinationModel =
                destinationTransformer.transformDestination(
                  destinations.data[i]
                );
              new_destinations.push(newDest);
            }
            appContext.UpdateDestinations(new_destinations);
          }

          if (tags.success) {
            appContext.UpdateTags([]);
            let new_tags: DestinationTag[] = [];
            for (let i = 0; i < tags.data.tags.length; i++) {
              let newTag: DestinationTag = {
                id: tags.data.tags[i].id,
                name: tags.data.tags[i].name,
              };
              new_tags.push(newTag);
            }
            appContext.UpdateTags(new_tags);
          }
        })
        .catch((error) => {
          loadingCtx.UpdateLoadingText("Error Loading Destinations");
        })
        .finally(() => {
          loadingCtx.UpdateLoading(false);
        });
    }
  }

  useEffect(() => {
    FetchAll();
  }, []);

  function handleGoButtonClick() {
    LocalStorageManager.UpdateDestinationLocalStorage(appContext.destinations);
    LocalStorageManager.UpdateTagLocalStorage(appContext.tags);

    appContext.UpdateCurrentScreen("explore");
  }

  return (
    <>
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

          <DidYouKnow />

          

          <div id="go_wrap">
            {loadingCtx.loading ? (
              <div className="waiting-go">
                <AnimatedBoat size={100} />
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
