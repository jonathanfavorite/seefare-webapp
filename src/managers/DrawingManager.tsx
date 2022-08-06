import LatLngModel from "../models/LatLngModel";
import { MarkerModel, MarkerType } from "../models/MarkerModel";
import { PathfindModel, PathFindTimes } from "../models/PathfindModel";

export default class DrawingManager {
  map: google.maps.Map;
  polylines: google.maps.Polyline[];
  markers: google.maps.Marker[];
  destinationID: number;

  constructor(map: google.maps.Map, destinationID: number) {
    this.map = map;
    this.polylines = [];
    this.markers = [];
    this.destinationID = destinationID;
  }
  clearPolyLines() {}

  run(markers: MarkerModel[]): PathfindModel {
    this.createMarker(markers[0]);
    let bounds = new google.maps.LatLngBounds();
    for (let i = 1; i < markers.length; i++) {
      this.drawPolyLine(
        markers[i - 1].position,
        markers[i].position,
        markers[i].speed
      );
      if (markers[i].type == MarkerType.Bridge) {
        this.createMarker(markers[i]);
      }
      if (
        markers[i].destinationID == this.destinationID ||
        markers[i].subDestinationID == this.destinationID
      ) {
        this.createMarker(markers[i]);
      }
      bounds.extend({
        lat: markers[i].position.lat,
        lng: markers[i].position.lng,
      });
    }

    this.DrawSpeedLimits(markers);

    this.map.fitBounds(bounds);

    /*
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

    */

    let pathfindTimes: PathFindTimes = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      hoursText: "",
      minutesText: "",
      secondsText: "",
    };
    let pathfindModel: PathfindModel = {
      nodes: [],
      times: pathfindTimes,
    };
    return pathfindModel;
  }

  createMarker(marker: MarkerModel) {
    let sizeSquared = 40;
    let finalIcon = {
      url: "",
      scaledSize: new google.maps.Size(sizeSquared, sizeSquared),
    };

    function iconSource(): string {
      return "../../images/markers/";
    }
    switch (marker.type) {
      case MarkerType.House:
        finalIcon = {
          url: `${iconSource()}house.png`,
          scaledSize: new google.maps.Size(sizeSquared, sizeSquared),
        };
        break;
      case MarkerType.Bridge:
        finalIcon = {
          url: `${iconSource()}bridge.png`,
          scaledSize: new google.maps.Size(sizeSquared, sizeSquared * 0.75),
        };
        break;
      case MarkerType.Destination:
        finalIcon = {
          url: `${iconSource()}marker.png`,
          scaledSize: new google.maps.Size(sizeSquared * 0.75, sizeSquared),
        };
        break;
      case MarkerType.SubDestination:
        finalIcon = {
          url: `${iconSource()}marker.png`,
          scaledSize: new google.maps.Size(sizeSquared * 0.75, sizeSquared),
        };
        break;
    }

    let m = new google.maps.Marker({
      position: { lat: marker.position.lat, lng: marker.position.lng },
      map: this.map,
      icon: finalIcon,
      zIndex: 10,
    });
    console.log(finalIcon);
    this.markers.push(m);
  }
  drawPolyLine(from: LatLngModel, to: LatLngModel, speed: number) {
    const newLine = new google.maps.Polyline({
      path: [from, to],
      strokeColor: this.getPolyLineColorBasedOnSpeed(speed),
      strokeOpacity: 1.0,
      strokeWeight: 7,
      map: this.map,
    });
    this.polylines.push(newLine);
  }

  drawSpeedLimitChange(marker: MarkerModel) {
    let sizeSquared = 30;
    let speedMarker = new google.maps.Marker({
      position: { lat: marker.position.lat, lng: marker.position.lng },
      map: this.map,
      icon: {
        url: this.getMarkerSpeedIcon(marker.speed),
        scaledSize: new google.maps.Size(sizeSquared, sizeSquared),
      },
    });
    this.markers.push(speedMarker);
  }

  didSpeedLimitChange(previousSpeed: number, targetSpeed: number): boolean {
    if (previousSpeed != targetSpeed) {
      return true;
    }
    return false;
  }
  DrawSpeedLimits(markers: MarkerModel[]) {
    for (let i = markers.length - 1; i > 0; i--) {
      let thisMarker = markers[i];
      let nextMarker = markers[i - 1];
      let didSpeedLimitChange = this.didSpeedLimitChange(
        nextMarker.speed,
        thisMarker.speed
      );
      if (didSpeedLimitChange) {
        this.drawSpeedLimitChange(thisMarker);
      }
    }
  }

  getMarkerSpeedIcon(speed: number) {
    let finalIcon = "../../images/speed/5.png";
    if (speed <= 5) {
      finalIcon = "../images/speed/5.png";
    } else {
      finalIcon = "../images/speed/25.png";
    }
    return finalIcon;
  }
  getPolyLineColorBasedOnSpeed(speed: number): string {
    let finalColor = "#E0E722";
    if (speed <= 5) {
      finalColor = "#E0E722";
    } else {
      finalColor = "#44D62C";
    }
    return finalColor;
  }
}
