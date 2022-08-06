import React, { createContext, useState } from "react";
import LatLngModel from "../models/LatLngModel";

interface MapContextProps {
  map: any;
  searchFromText: string;
  searchFromCoords: LatLngModel;
  searchToText: string;
  searchToID: number;
  selectedTagID: number;
  toggleCustomPin: boolean;
  updateSelectedTagID: (selectedTagID: number) => void;
  updateSearchFromText: (searchFrom: string) => void;
  updateSearchToText: (searchTo: string) => void;
  updateMap: (map: any) => void;
  updateSearchButtonClicked: () => void;
  updateCustomPin: (toggleCustomPin: boolean) => void;
  updateSearchFromCoords: (searchFromCoords: LatLngModel) => void;
  updateSearchToID: (searchToID: number) => void;
  searchButtonClicked: number;
}

const MapContext = createContext<MapContextProps>(null as any);

function MapContextProvider(props: any) {
  const [map, setMap] = useState(null);
  const [searchFromText, setSearchFromText] = useState<string>("");
  const [searchToText, setSearchToText] = useState<string>("");

  const [searchFromCoords, setSearchFromCoords] = useState<LatLngModel>({ lat: 0, lng: 0 });
  const [searchToID, setSearchToID] = useState<number>(0);

  const [searchButtonClicked, setSearchButtonClicked] = useState<number>(0);
  const [selectedTagID, setSelectedTagID] = useState<number>(0);
  const [toggleCustomPin, setToggleCustomPin] = useState(false);

  const updateMap = (map: any) => {
    setMap(map);
  };
  const updateSearchFromText = (searchFrom: string) => {
    setSearchFromText(old => searchFrom);
  };
  const updateSearchToText = (searchTo: string) => {
    setSearchToText(old => searchTo);
  };
  const updateSearchButtonClicked = () => {
    setSearchButtonClicked(old => old + 1);
  }
  const updateSelectedTagID = (selectedTagID: number) => {
    setSelectedTagID(old => selectedTagID);
  }
  const updateCustomPin = (toggleCustomPin: boolean) => {
    setToggleCustomPin(old => toggleCustomPin);
  }
  const updateSearchFromCoords = (searchFromCoords: LatLngModel) => {
    setSearchFromCoords(old => searchFromCoords);
  }
  const updateSearchToID = (searchToID: number) => {
    setSearchToID(old => searchToID);
  }

  let contextList: MapContextProps = {
    map,
    searchFromText,
    searchFromCoords,
    searchToID,
    searchToText,
    updateMap,
    selectedTagID,
    toggleCustomPin,
    updateSelectedTagID,
    updateSearchFromText,
    updateSearchToText,
    updateSearchFromCoords,
    updateSearchToID,
    updateCustomPin,
    updateSearchButtonClicked,
    searchButtonClicked
  };

  return (
    <MapContext.Provider value={contextList}>
      {props.children}
    </MapContext.Provider>
  );
}

export { MapContext, MapContextProvider };
