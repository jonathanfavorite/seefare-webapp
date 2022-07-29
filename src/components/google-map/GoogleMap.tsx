// import React, { useEffect, useState } from 'react'
// import './GoogleMap.scss';
// // import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';


// interface GoogleMapProps {
//     address?: String,
//     CenterLat: number,
//     CenterLng: number,
//     zoom: number
// }

// export default function GoogleMapComponent(mapProps: GoogleMapProps) {
  
//   // const renderMarkers = (map: any, maps: any) => {
//   //   let marker = new maps.Marker({
//   //   position: { lat: latitude, lng: longitude },
//   //   map,
//   //   title: 'Hello World!'
//   //   });
//   //   return marker;
//   //  };

//   const center = {
//     lat: mapProps.CenterLat,
//     lng: mapProps.CenterLng
//   }


//   const defaultMapOptions = {
//     fullscreenControl: false,
//     mapTypeControl: false,
//     streetViewControl: false,
//     zoomControl: false,
//     gestureHandling: 'greedy'
//   }




//     return <>
//     <div className='google-map-container'>
//       <LoadScript
//         googleMapsApiKey="AIzaSyClkVFV4nBOJl2Nc1nZKHSyDa7nhT2xQyw"
//       >
//         <GoogleMap
//           center={center}
//           zoom={15}
//           options={defaultMapOptions}
//         >

//           <Marker position={center} />

//           </GoogleMap>
//       </LoadScript>
//     {/* <GoogleMapReact
//         bootstrapURLKeys={{ key: 'AIzaSyClkVFV4nBOJl2Nc1nZKHSyDa7nhT2xQyw' }}
//         defaultCenter={{lat: mapProps.CenterLat, lng: mapProps.CenterLng}}
//         defaultZoom={mapProps.zoom}
//         yesIWantToUseGoogleMapApiInternals
//         options={defaultMapOptions}
//       >

//       </GoogleMapReact> */}

   
//       </div>
//     </>
// }

export {}