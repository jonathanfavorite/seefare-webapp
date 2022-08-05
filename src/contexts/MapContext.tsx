import React, { createContext, useState } from "react";

interface MapContextProps {
  map: any;
  searchFrom: string;
  searchTo: string;
  updateSearchFrom: (searchFrom: string) => void;
  updateSearchTo: (searchTo: string) => void;
  updateMap: (map: any) => void;
}

const MapContext = createContext<MapContextProps>(null as any);

function MapContextProvider(props: any) {
  const [map, setMap] = useState(null);
  const [searchFrom, setSearchFrom] = useState<string>("");
  const [searchTo, setSearchTo] = useState<string>("");

  const updateMap = (map: any) => {
    setMap(map);
  };
  const updateSearchFrom = (searchFrom: string) => {
    setSearchFrom(old => searchFrom);
  };
  const updateSearchTo = (searchTo: string) => {
    setSearchTo(old => searchTo);
  };

  let contextList: MapContextProps = {
    map,
    searchFrom,
    searchTo,
    updateMap,
    updateSearchFrom,
    updateSearchTo
  };

  return (
    <MapContext.Provider value={contextList}>
      {props.children}
    </MapContext.Provider>
  );
}

export { MapContext, MapContextProvider };
