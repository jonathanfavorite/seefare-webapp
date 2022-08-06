import { DestinationModel } from "./DestinationModel";
import LatLngModel from "./LatLngModel";

enum MarkerType {
    Marker = 0,
    Bridge = 1,
    Destination = 2,
    SubDestination = 3,
    House = 4
}

interface MarkerModel {
    id: number;
    position: LatLngModel;
    speed: number;
    type: MarkerType;
    destination?: DestinationModel;
    marker?: google.maps.Marker;
    destinationID: number;
    subDestinationID: number;
}

export { type MarkerModel, MarkerType };