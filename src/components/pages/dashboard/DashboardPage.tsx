import React, { useContext, useEffect, useLayoutEffect } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { MapContext } from "../../../contexts/MapContext";
import {
    LocalStorageManager,
    ReturnCheckedLocalStorage,
} from "../../../helpers/CheckLocalStorage";

import FooterNavigation from "../../molecules/footer-navigation/FooterNavigation";
import Header from "../../molecules/header/Header";
import DashboardTemplate from "../../templates/dashboard/DashboardTemplate";
import "./DashboardPage.scss";
function DashboardPage() {
    const loadingCtx = useContext(LoadingContext);
    const appCtx = useContext(AppContext);
    const mapCtx = useContext(MapContext);

    useLayoutEffect(() => {

      console.log(appCtx.destinations);
      console.log(appCtx.tags);  
      console.log("HEY");

        let check: ReturnCheckedLocalStorage =
            LocalStorageManager.CheckLocalStorage({
                destinationHasValue:
                    appCtx.destinations.length > 0 ? true : false,
                tagHasValue: appCtx.tags.length > 0 ? true : false,
            });
        if (check.needToBeRedirected) {
          if(check.destinations.length > 0 || check.tags.length > 0) {
            console.log("REDIRECTING");
          }
        } else {
          console.log("all good!");
        }
    }, []);

    return (
        <div id="dashboard-screen-wrapper">
            <div className="header-wrap">{<Header />}</div>
            <div className="dashboard-content-wrap">
           
                <DashboardTemplate />
            </div>
            <div className="dashboard-footer-navigation-wrap">
                {<FooterNavigation />}
            </div>
        </div>
    );
}

export default DashboardPage;
