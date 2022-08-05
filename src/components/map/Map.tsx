import React, { useContext, useEffect, useRef, useState } from "react";
import "./Map.scss";
import {DarkThemeMap} from "../../helpers/MapStyles";
import { MapContext } from "../../contexts/MapContext";
import { AppContext } from "../../contexts/AppContext";

interface MapProps {
  goButtonPress?: () => void;
}

function Map(props: MapProps) {

  const mapContext = useContext(MapContext);
  const appContext = useContext(AppContext);
  const mapRef = useRef(null);

  let foundPath = [
    {
        "id": 1,
        "lat": 26.605045551439343,
        "lng": -81.91779183869251,
        "type": 0,
        "connectedNodes": [
            {
                "id": 3308556164627,
                "fromSelf": false,
                "distance": 0.03921545947204248
            },
            {
                "id": 1653324513701,
                "fromSelf": false,
                "distance": 0.03314775086629634
            }
        ],
        "active": false,
        "speed": 0,
        "isBridge": false,
        "destination": false,
        "destinationID": 0
    },
    {
        "id": 1653324513701,
        "lat": 26.60484843199908,
        "lng": -81.91828101580795,
        "type": 0,
        "connectedNodes": [
            {
                "id": 8266622579986,
                "fromSelf": false,
                "distance": 0.09
            },
            {
                "id": 8266622607651,
                "fromSelf": false,
                "distance": 0.06
            },
            {
                "id": 1653324501949,
                "fromSelf": true,
                "distance": 0.07
            },
            {
                "id": 3308556164627,
                "fromSelf": false,
                "distance": 0.07
            },
            {
                "id": 3308556164627,
                "fromSelf": true,
                "distance": 0.07
            }
        ],
        "active": false,
        "speed": 5,
        "isBridge": false,
        "destination": false,
        "destinationID": 0
    },
    {
        "id": 1653324501949,
        "lat": 26.60445754113631,
        "lng": -81.91941334535056,
        "type": 0,
        "connectedNodes": [
            {
                "id": 8266622517541,
                "fromSelf": false,
                "distance": 0.04
            },
            {
                "id": 8266622497621,
                "fromSelf": true,
                "distance": 0.04
            },
            {
                "id": 1653324513701,
                "fromSelf": false,
                "distance": 0.07
            }
        ],
        "active": false,
        "speed": 5,
        "isBridge": false,
        "destination": false,
        "destinationID": 0
    },
    {
        "id": 8266622497621,
        "lat": 26.60396193295359,
        "lng": -81.91923480239224,
        "type": 0,
        "connectedNodes": [
            {
                "id": 1653324501949,
                "fromSelf": false,
                "distance": 0.04
            },
            {
                "id": 8266622771886,
                "fromSelf": false,
                "distance": 0.14
            },
            {
                "id": 1657386398579,
                "fromSelf": true,
                "distance": 0.13
            }
        ],
        "active": false,
        "speed": 5,
        "isBridge": false,
        "destination": false,
        "destinationID": 0
    },
    {
        "id": 1657386398579,
        "lat": 26.60228701222484,
        "lng": -81.91840104888448,
        "type": 0,
        "connectedNodes": [
            {
                "id": 8266622497621,
                "fromSelf": false,
                "distance": 0.13
            },
            {
                "id": 1658284095850,
                "fromSelf": false,
                "distance": 0.07
            },
            {
                "id": 8291421445256,
                "fromSelf": true,
                "distance": 0.12
            }
        ],
        "active": false,
        "speed": 5,
        "isBridge": false,
        "destination": false,
        "destinationID": 0
    },
    {
        "id": 8291421445256,
        "lat": 26.60070359371415,
        "lng": -81.91900630318179,
        "type": 0,
        "connectedNodes": [
            {
                "id": 1658284288490,
                "fromSelf": true,
                "distance": 0.12
            },
            {
                "id": 1657386398579,
                "fromSelf": false,
                "distance": 0.12
            },
            {
                "id": 1658284095850,
                "fromSelf": true,
                "distance": 0.12
            }
        ],
        "active": false,
        "speed": 5,
        "isBridge": false,
        "destination": false,
        "destinationID": 0
    },
    {
        "id": 1658284288490,
        "lat": 26.59976345867953,
        "lng": -81.92068000160708,
        "type": 2,
        "connectedNodes": [
            {
                "id": 8291421445256,
                "fromSelf": false,
                "distance": 0.12
            }
        ],
        "active": false,
        "speed": 5,
        "isBridge": false,
        "destination": true,
        "destinationID": 1658283563690
    }
  ]

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
    if(mapContext.searchButtonClicked != 0)
    {
      ShowPath();
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

  function ShowPath() {
    const strokeColor = "black";
    //foundPath
    if (mapRef.current) {
      console.log("ready");
      //26.605254772052433 -81.91791049095617
      let line = new google.maps.Polyline({
        path: [
          { lat: 26.605254772052433, lng: -81.91791049095617 },
          { lat: foundPath[0].lat, lng: foundPath[0].lng },
        ],
        strokeColor: strokeColor,
        strokeOpacity: 1.0,
        strokeWeight: 5,
      });

      let newMarker = new google.maps.Marker({
        position: { lat: 26.605254772052433, lng: -81.91791049095617 },
        map: mapContext.map
      });

      line.setMap(mapContext.map);

      for (let i = 1; i < foundPath.length; i++) {
        let line = new google.maps.Polyline({
          path: [
            { lat: foundPath[i - 1].lat, lng: foundPath[i - 1].lng },
            { lat: foundPath[i].lat, lng: foundPath[i].lng },
          ],
          strokeColor: strokeColor,
          strokeOpacity: 1.0,
          strokeWeight: 5,
        });

        if (i == foundPath.length - 1) {
          let newMarker = new google.maps.Marker({
            position: { lat: foundPath[i].lat, lng: foundPath[i].lng },
            map: mapContext.map,
          });
        }

        line.setMap(mapContext.map);
      }

      fitBoundsToMarkers();
    }
  }

  function fitBoundsToMarkers() {
    let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < foundPath.length; i++) {
      bounds.extend({ lat: foundPath[i].lat, lng: foundPath[i].lng });
    }
    mapContext.map.fitBounds(bounds);
    mapContext.map.setZoom(mapContext.map.getZoom() - 1);
  }

  return <div className="map-container" ref={mapRef}></div>;
}

export default Map;
