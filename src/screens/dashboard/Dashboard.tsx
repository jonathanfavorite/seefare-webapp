import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import Map from "../../components/map/Map";
import FullScreenLoading from "../../components/loading/full-screen-loading/FullScreenLoading";
import { DestinationModel, DestinationTag } from "../../models/DestinationModel";
import { AppContext } from "../../contexts/AppContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import FooterNavigation from "../../components/footer-navigation/FooterNavigation";
import Header from "../../components/header/Header";
import SearchForm from "../../components/dashboard/search-form/SearchForm";
import DestinationService from "../../services/api/destination.service";


export default function DashBoardScreen() {
  const destinationManager = new DestinationService();
  const loadingCtx = useContext(LoadingContext);
  const appCtx = useContext(AppContext);

  
  
  useEffect(() => {
    appCtx.UpdateCurrentScreen("explore");
    if(appCtx.destinations.length === 0) {
      let exampleDestination : DestinationModel = {
        id: 1,
        name: "Example Destination",
      }
      appCtx.UpdateDestinations([exampleDestination]);
    }
    if(appCtx.tags.length === 0) {
      let exampleTag : DestinationTag = {
        id: 1,
        name: "Example Tag",
      }
      appCtx.UpdateTags([exampleTag]);
    }
  }, []);


  return (
    <div id="dashboard-screen-wrapper">
      {loadingCtx.loading && <FullScreenLoading />}

      <div className="dashboard-content">
        <Header />

        <div className="tags-wrap">
          <div className="tags-list">
            {appCtx.tags.map((item, index) => {
              return (
                <div className="tag"  key={index}>
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>

        <div className="maps-wrap">
          <div className="maps-content">
            <Map />
          </div>

          <div className="hidden-slider-wrap"></div>
          <div className="draggable-slider-wrap">
            <div className="content">
              <div className="slider-grip"></div>
              {!loadingCtx.loading && (
                <SearchForm />
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
