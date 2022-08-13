import React, { createContext, useState } from "react";
import LatLngModel from "../models/LatLngModel";
import { PathfindModel } from "../models/PathfindModel";

interface MapContextProps {
    map: any;
    searchFromText: string;
    searchFromCoords: LatLngModel;
    searchToText: string;
    searchToID: number;
    selectedTagID: number;
    toggleCustomPin: boolean;
    startPathfinding: number;
    pathfindResults: PathfindModel | null;
    markers: google.maps.Marker[];
    polylines: google.maps.Polyline[];
    clearMap: () => void;
    addMarker: (marker: google.maps.Marker) => void;
    addPolyline: (polyline: google.maps.Polyline) => void;
    updatePathfindResults: (pathfindResults: PathfindModel | null) => void;
    updateSelectedTagID: (selectedTagID: number) => void;
    updateSearchFromText: (searchFrom: string) => void;
    updateSearchToText: (searchTo: string) => void;
    updateMap: (map: any) => void;
    updateSearchButtonClicked: () => void;
    updateCustomPin: (toggleCustomPin: boolean) => void;
    updateSearchFromCoords: (searchFromCoords: LatLngModel) => void;
    updateSearchToID: (searchToID: number) => void;
    updateStartPathfinding: () => void;
    searchButtonClicked: number;
    resetSearch: () => void;
}

const MapContext = createContext<MapContextProps>(null as any);

function MapContextProvider(props: any) {
    const [map, setMap] = useState(null);
    const [searchFromText, setSearchFromText] = useState<string>("");
    const [searchToText, setSearchToText] = useState<string>("");

    const [searchFromCoords, setSearchFromCoords] = useState<LatLngModel>({
        lat: 0,
        lng: 0,
    });
    const [searchToID, setSearchToID] = useState<number>(0);
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    const [polylines, setPolylines] = useState<google.maps.Polyline[]>([]);

    const [searchButtonClicked, setSearchButtonClicked] = useState<number>(0);
    const [selectedTagID, setSelectedTagID] = useState<number>(0);
    const [toggleCustomPin, setToggleCustomPin] = useState(false);

    const [pathfindResults, setPathfindResults] =
        useState<PathfindModel | null>(null);

    const [startPathfinding, setStartPathfinding] = useState(0);

    const clearMap = () => {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        setMarkers([]);
        for (let i = 0; i < polylines.length; i++) {
            polylines[i].setMap(null);
        }
        setPolylines([]);
    };

    const addMarker = (marker: google.maps.Marker) =>{
        setMarkers([...markers, marker]);
    }
    const addPolyline = (polyline: google.maps.Polyline) =>{
        setPolylines([...polylines, polyline]);
    }

    const updateMap = (map: any) => {
        setMap(map);
    };
    const updateSearchFromText = (searchFrom: string) => {
        setSearchFromText((old) => searchFrom);
    };
    const updateSearchToText = (searchTo: string) => {
        setSearchToText((old) => searchTo);
    };
    const updateSearchButtonClicked = () => {
        setSearchButtonClicked((old) => old + 1);
    };
    const updateSelectedTagID = (selectedTagID: number) => {
        setSelectedTagID((old) => selectedTagID);
    };
    const updateCustomPin = (toggleCustomPin: boolean) => {
        setToggleCustomPin((old) => toggleCustomPin);
    };
    const updateSearchFromCoords = (searchFromCoords: LatLngModel) => {
        setSearchFromCoords((old) => searchFromCoords);
    };
    const updateSearchToID = (searchToID: number) => {
        setSearchToID((old) => searchToID);
    };
    const updateStartPathfinding = () => {
        setStartPathfinding((old) => old + 1);
    };
    const updatePathfindResults = (pathfindResults: PathfindModel | null) => {
        setPathfindResults((old) => pathfindResults);
    };
    const resetSearch = () => {
        setSearchFromText("");
        setSearchToText("");
        setSearchFromCoords({ lat: 0, lng: 0 });
        setSearchToID(0);
        setToggleCustomPin(false);
        setPathfindResults(null);
        setStartPathfinding(0);
    };

    let contextList: MapContextProps = {
        map,
        searchFromText,
        searchFromCoords,
        searchToID,
        searchToText,
        updateMap,
        markers,
        polylines,
        clearMap,
        addMarker,
        addPolyline,
        selectedTagID,
        toggleCustomPin,
        updateSelectedTagID,
        updateSearchFromText,
        updateSearchToText,
        updateSearchFromCoords,
        updateSearchToID,
        updateCustomPin,
        updateSearchButtonClicked,
        updateStartPathfinding,
        searchButtonClicked,
        startPathfinding,
        pathfindResults,
        updatePathfindResults,
        resetSearch,
    };

    return (
        <MapContext.Provider value={contextList}>
            {props.children}
        </MapContext.Provider>
    );
}

export { MapContext, MapContextProvider };
