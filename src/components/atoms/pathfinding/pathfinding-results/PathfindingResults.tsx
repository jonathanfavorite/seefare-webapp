import React, { useContext } from 'react'
import { MapContext } from '../../../../contexts/MapContext';
import "./PathfindingResults.scss";

function PathfindingResults() {
  const mapCtx = useContext(MapContext);



  return (
    <div id="details_wrap">
    <div className="detail_indi">
        <b>Distance</b>
        <span id="distance_text">{mapCtx.pathfindResults!.miles}</span>
        <small>Miles</small>
    </div>
    <div className="detail_indi">
        <b>Bridges</b>
        <span id="bridges_text">{mapCtx.pathfindResults!.bridges}</span>
    </div>
    <div className="detail_indi">
        <b>Time</b>
        <span id="time_text">{mapCtx.pathfindResults?.times.timeText}</span>
    </div>
</div>
  )
}

export default PathfindingResults