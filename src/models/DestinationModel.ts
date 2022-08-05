type DestinationModel = {
    id: number;
    name: string;
    markerID?: number;
    primarydestination?: boolean;
    subdestinations?: number[];
    details?: DestinationDetail;

}
type DestinationDetail = {
    id: number;
    destinationID: number;
    description?: string;
    website?: string;
    address?: string,
    phone?: string,
    tags: DestinationTag[];
    lat: number;
    lng: number;
}
type DestinationTag = {
    id: number;
    name: string;
}

export type { DestinationModel, DestinationDetail, DestinationTag };