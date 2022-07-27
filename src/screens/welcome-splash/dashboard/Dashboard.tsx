import React, { ReactElement, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../components/logo/Logo";
import "./Dashboard.scss";
import GoogleMap from "../../../components/google-map/GoogleMap";
import GoButton from "../../../components/go-button/GoButton";
export default function DashBoardScreen() {
  // function MyMapComponent({
  //     center,
  //     zoom,
  //   }: {
  //     center: google.maps.LatLngLiteral;
  //     zoom: number;
  //   }) {

  //     const ref = useRef();

  //     useEffect(() => {
  //       new window.google.maps.Map(ref.current, {
  //         center,
  //         zoom,
  //       });
  //     });

  //     return <div ref={ref} id="map" />;
  //   }

  let arr: any[] = [
    "Restaurants",
    "Docks",
    "Fun",
    "Beaches",
    "Slips",
    "Fishing",
    "Beaches",
    "Slips",
    "Fishing",
  ];

  // const mapContent = (status: Status) => {
  //     switch(status)
  //     {
  //         case Status.LOADING:
  //             return <Logo />
  //         case Status.FAILURE:
  //             return <Logo />
  //         case Status.SUCCESS:
  //             return <Logo />
  //         default:
  //             return <Logo />
  //         break;
  //     }
  // }

  return (
    <div id="dashboard-screen-wrapper">
      <div className="dashboard-content">
        <div className="destination-fixed-wrap">
          <div className="content">
            {arr.map((item, index) => {
              return (
                <div className="indi" key={index}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        <div className="maps-wrapper">
          <div className="content">
            <GoogleMap
              CenterLat={26.557295329918524}
              CenterLng={-81.95078987887055}
              zoom={14}
            />

            {/* <Wrapper apiKey="AIzaSyClkVFV4nBOJl2Nc1nZKHSyDa7nhT2xQyw" render={mapContent}>

                        </Wrapper> */}
          </div>
        </div>

        <div className="main-content-wrapper">
          <div className="sticky-main-box">
            <div className="content">
              <div className="slide-bar-wrap">
                <div className="bar"></div>
              </div>

              <div className="search-form-wrap">
                <div className="column">
                  <div className="input-wrap">
                    <div className="button">&nbsp;
                      <div className="hamburger"></div>
                    </div>
                    <div className="input">
                      <div className="search-icon"></div>
                      <input
                        type="text"
                        placeholder="From Address or Location"
                        className="address_input"
                      />
                    </div>
                  </div>
                  <div className="input-wrap">
                    <div className="button text-button">TO</div>
                    <div className="input">
                      <select className="destination-select">
                        <option value="">Fort Myers Beach</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="column go-column">
                  <div className="big-search-button">
                    <GoButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-wrapper">
          <div className="content">
            <div className="left">
              <Logo />
            </div>
            <div className="right">Cape Coral, Florida</div>
          </div>
        </div>
      </div>
    </div>
  );
}
