import React, { useContext, useEffect, useRef, useState } from "react";
import "./Map.scss";
import { DarkThemeMap } from "../../helpers/Map/MapStyles";
import { MapContext } from "../../contexts/MapContext";
import { AppContext } from "../../contexts/AppContext";
import { DestinationModel } from "../../models/DestinationModel";
import LatLngModel from "../../models/LatLngModel";
import { MarkerModel, MarkerType } from "../../models/MarkerModel";

interface MapProps {
  goButtonPress?: () => void;
}

function Map(props: MapProps) {
  const mapContext = useContext(MapContext);
  const appContext = useContext(AppContext);
  const mapRef = useRef(null);

  const [markers, setMarkers] = useState<MarkerModel[]>([]);

  function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].marker.setMap(null);
    }
    setMarkers((old) => []);
  }
  function addMarker(marker: any) {
    setMarkers((old) => [...old, marker]);
  }

  function ShowCurrentTags(destinations: DestinationModel[]) {
    let x = 0;
    console.log("SHOWCURRENTTAGS", destinations);
    for (let i = 0; i < destinations.length; i++) {
      if (destinations[i].details) {
        let lat = destinations[i].details!.lat;
        let lng = destinations[i].details!.lng;
        if (lat != 0 && lng != 0) {
          let newMarkerObject = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: mapContext.map,
          });
          let newMarker: MarkerModel = {
            lat: lat,
            lng: lng,
            marker: newMarkerObject,
            type: MarkerType.Destination,
            id: destinations[i].id,
          };
          addMarker(newMarker);
        }
      }
    }
    //console.log("showing " + x + " tags");
  }

  useEffect(() => {
    clearMarkers();
    if (mapContext.selectedTagID > 0) {
      let getSelectedTagDestinations = GetDestinationsByTagID(
        mapContext.selectedTagID
      );
      console.log(getSelectedTagDestinations.length + " found for tag");
      if (getSelectedTagDestinations.length > 0) {
        ShowCurrentTags(getSelectedTagDestinations);
        FitBoundsToSelectedTags(getSelectedTagDestinations);
      }
    }
  }, [mapContext.selectedTagID]);

  function GetDestinationsByTagID(tagID: number): DestinationModel[] {
    let destinations: DestinationModel[] = [];
    for (let i = 0; i < appContext.destinations.length; i++) {
      let destination = appContext.destinations[i];
      if (destination.details?.lat == 0 || destination.details?.lng == 0) {
        continue;
      }
      if (destination.details?.tags) {
        for (let j = 0; j < destination.details?.tags.length; j++) {
          if (destination.details?.tags[j].id == tagID) {
            destinations.push(destination);
          }
        }
      }
    }
    return destinations;
  }

  const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    gestureHandling: "greedy",
    disableDefaultUI: true,
  };

  const noPoi = [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ];

  useEffect(() => {
    if (mapContext.searchButtonClicked != 0) {
      //ShowPath();
    }
  }, [mapContext.searchButtonClicked]);


  useEffect(() => {
    if (mapRef.current) {
      let newMap = new google.maps.Map(mapRef.current, {
        center: {
          lat: 26.557295329918524,
          lng: -81.95078987887055,
        },
        zoom: 14,
      });

      newMap.setOptions(defaultMapOptions);
      newMap.setOptions({ styles: noPoi });
      mapContext.updateMap(newMap);
    }
  }, []);

  function showTagName() {}

  function FitBoundsToSelectedTags(positions: DestinationModel[]) {
    console.log("markers", markers);
    let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < positions.length; i++) {
      console.log("lat", positions[i].details?.lat);
      console.log("lng", positions[i].details?.lng);
      bounds.extend({
        lat: positions[i].details!.lat,
        lng: positions[i].details!.lng,
      });
    }
    mapContext.map.fitBounds(bounds);
    //mapContext.map.setZoom(17);
    if (mapContext.map.getZoom() > 17) {
      mapContext.map.setZoom(17);
    }
  }
  function fitBoundsOnMap(positions: LatLngModel[]) {
    let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < positions.length; i++) {
      let latlng = new google.maps.LatLng(positions[i].lat, positions[i].lng);
      mapContext.map.fitBounds(bounds);
    }
    mapContext.map.fitBounds(bounds);
    //mapContext.map.setZoom(mapContext.map.getZoom() - 1);
  }


  return <div className="map-container" ref={mapRef}></div>;
}

export default Map;
