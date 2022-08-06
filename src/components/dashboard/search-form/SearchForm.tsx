import React, { createRef, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { MapContext } from "../../../contexts/MapContext";
import { GoButtonWithClickEvent } from "../../go-button/GoButton";
import { DestinationModel } from "../../../models/DestinationModel";
import "./SearchForm.scss";
import { XInsideCircle } from "../../icons/Icons";


function SearchForm() {
  const mapCtx = useContext(MapContext);
  const appCtx = useContext(AppContext);
  
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = createRef<HTMLSelectElement>();

  const [showToValidation, setShowToValidation] = useState(false);

  const autocomplete = new google.maps.places.Autocomplete(fromRef.current!);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    
    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    // get the lat / long
    let customStartingPoint = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
    }
      mapCtx.map.setCenter(place.geometry.location);
      mapCtx.map.setZoom(17);

      mapCtx.updateSearchFromText(place.name!);
      mapCtx.updateSearchFromCoords(customStartingPoint);
    
      mapCtx.updateCustomPin(true);


  });

  useEffect(() => {
    //miniDest.length > 0 && mapCtx.updateSearchTo(miniDest[0].name);
    if(appCtx.destinations.length > 0) {
      mapCtx.updateSearchToID(parseInt(toRef.current!.value));
    }
  }, []);

  const handleSearchFromChange = () => {
    if (fromRef.current) {
      setShowToValidation(false);
      mapCtx.updateSearchFromText(fromRef.current.value);
    }
  };
  const handleSearchToChange = () => {
    if (toRef.current) {
      mapCtx.updateSearchToText(toRef.current.value);
    }
  };

  const handleGoButtonClickEvent = () => {
    if(mapCtx.searchToText == "") {
      if(toRef.current) {
        mapCtx.updateSearchToText(toRef.current.value);
      }
    }
    if(mapCtx.searchFromText == ""){
      console.log("Please select a starting point");
      setShowToValidation(true);
    }
    else if(mapCtx.searchFromCoords.lat == 0 && mapCtx.searchFromCoords.lng == 0){
      console.log("Please select a starting point (coords)");
      setShowToValidation(true);
    }
    else
    {
      //mapCtx.updateSearchButtonClicked();
      console.log("All good! Here are the details");
      console.log("From Coords", mapCtx.searchFromCoords);
      console.log("To ID", mapCtx.searchToID);

      mapCtx.updateStartPathfinding();

    }
  };

  const handleClearInputButton = () => {
    if (fromRef.current) {
      fromRef.current.value = "";
      mapCtx.updateSearchFromText("");
    }
  }

  return (
    <div className="main-search-form">
      <div className="search-form-left">
        <div className="search-table">
          <div className="search-row">
            <div className="search-cell">
              <div className="icon position-icon"></div>
            </div>
            <div className="search-cell">
              <div className="input from-input">
                {showToValidation && <>
                <div className='input-validation-error'>
                  <div className="arrow"></div>
                  <div className="text">Please enter an address</div>
                </div>
                </>}
                {mapCtx.searchFromText.length > 0 ? <div className="clear-input-button" onClick={handleClearInputButton}><XInsideCircle /></div> : null }
                <input
                  type="text"
                  id="autocomplete"
                  placeholder="Enter a location"
                  value={mapCtx.searchFromText}
                  onChange={handleSearchFromChange}
                  onKeyUp={handleSearchFromChange}
                  ref={fromRef}
                />
              </div>
            </div>
          </div>
          <div className="search-row empty-cell"></div>
          <div className="search-row">
            <div className="search-cell">
              <div className="icon to-icon">TO</div>
            </div>
            <div className="search-cell">
              <div className="input">
                <select ref={toRef} onChange={handleSearchToChange}>
                  {
                    appCtx.destinations.map((destination: DestinationModel) => {
                      return <option key={destination.id} value={destination.id}>{destination.name}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="search-form-right">
        <div className="search-go-button">
          <GoButtonWithClickEvent onClick={handleGoButtonClickEvent} />
        </div>
      </div>
    </div>
  );
}

export default SearchForm;