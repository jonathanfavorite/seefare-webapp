import React from 'react'
import './GoogleMap.scss';
import GoogleMapReact from 'google-map-react';

interface GoogleMapProps {
    address?: String,
    CenterLat: number,
    CenterLng: number,
    zoom: number
}

export default function GoogleMap(mapProps: GoogleMapProps) {
  
  // const renderMarkers = (map: any, maps: any) => {
  //   let marker = new maps.Marker({
  //   position: { lat: latitude, lng: longitude },
  //   map,
  //   title: 'Hello World!'
  //   });
  //   return marker;
  //  };

  const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
  }
  
    return <>
    <div className='google-map-container'>

    <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyClkVFV4nBOJl2Nc1nZKHSyDa7nhT2xQyw' }}
        defaultCenter={{lat: mapProps.CenterLat, lng: mapProps.CenterLng}}
        defaultZoom={mapProps.zoom}
        options={defaultMapOptions}

      >
   
      </GoogleMapReact>

   
      </div>
    </>
}
