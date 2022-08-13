import React, { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { MapContext } from "../../../contexts/MapContext";
import SearchForm from "../../atoms/pathfinding/search-form/SearchForm";
import FooterNavigation from "../../molecules/footer-navigation/FooterNavigation";
import Header from "../../molecules/header/Header";
import TagList from "../../molecules/tag-list/TagList";
import MapWrapper from "../../organisms/map-wrapper/MapWrapper";
import "./DashboardTemplate.scss";

function DashboardTemplate() {
    const loadingCtx = useContext(LoadingContext);
    const appCtx = useContext(AppContext);
    const mapCtx = useContext(MapContext);
    return (
        <>
        <div className="dashboard-template-wrap">
            <div className="tags-list-wrap">{<TagList />}</div>
            <div className="maps-wrap-container">
                <MapWrapper />
            </div>
        </div>
        </>
    );
}

export default DashboardTemplate;
