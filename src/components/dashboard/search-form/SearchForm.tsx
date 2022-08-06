import React, { createRef, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { MapContext } from "../../../contexts/MapContext";
import { GoButtonWithClickEvent } from "../../go-button/GoButton";
import { DestinationModel } from "../../../models/DestinationModel";
import "./SearchForm.scss";


function SearchForm() {
  const mapCtx = useContext(MapContext);
  const appCtx = useContext(AppContext);
  
  const fromRef = createRef<HTMLInputElement>();
  const toRef = createRef<HTMLSelectElement>();

  const [showToValidation, setShowToValidation] = useState(false);

  useEffect(() => {
    //miniDest.length > 0 && mapCtx.updateSearchTo(miniDest[0].name);
  }, []);

  const handleSearchFromChange = () => {
    if (fromRef.current) {
      setShowToValidation(false);
      mapCtx.updateSearchFrom(fromRef.current.value);
    }
  };
  const handleSearchToChange = () => {
    if (toRef.current) {
      mapCtx.updateSearchTo(toRef.current.value);
    }
  };

  const handleGoButtonClickEvent = () => {
    if(mapCtx.searchTo == "") {
      if(toRef.current) {
        mapCtx.updateSearchTo(toRef.current.value);
      }
    }
    if(mapCtx.searchFrom == ""){
      console.log("Please select a starting point");
      setShowToValidation(true);
    }
    else
    {
      mapCtx.updateSearchButtonClicked();
    }
  };

  return (
    <div className="main-search-form">
      <div className="search-form-left">
        <div className="search-table">
          <div className="search-row">
            <div className="search-cell">
              <div className="icon position-icon"></div>
            </div>
            <div className="search-cell">
              <div className="input">
                {showToValidation && <>
                <div className='input-validation-error'>
                  <div className="arrow"></div>
                  <div className="text">Please enter an address</div>
                </div>
                </>}
                <input
                  type="text"
                  placeholder="Enter a location"
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