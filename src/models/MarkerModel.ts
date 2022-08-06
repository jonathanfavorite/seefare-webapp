import { DestinationModel } from "./DestinationModel";

enum MarkerType {
    Marker = 0,
    Destination = 1,
    Bridge = 2
}

interface MarkerModel {
    id: number;
    lat: number;
    lng: number;
    type: MarkerType;
    destination?: DestinationModel;
    marker: google.maps.Marker;
}

export { type MarkerModel, MarkerType };