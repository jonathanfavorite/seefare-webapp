import { DestinationDetail, DestinationModel, DestinationTag } from "../models/DestinationModel";

class DestinationManager {
    transformDestinationsFromAPI(destinations: any): DestinationModel[] {
        let transformedDestinations: DestinationModel[] = [];
        for (let i = 0; i < destinations.length; i++) {
            let destination = destinations[i];
            let transformedDestination = this.transformDestination(destination);
            transformedDestinations.push(transformedDestination);
        };
        return transformedDestinations;
    }
    transformDestination(destination: any): DestinationModel {
        let newDestination : DestinationModel = {
            id: destination.id,
            name: destination.name,
            markerID: destination.markerID,
            primarydestination: destination.primarydestination,
            subdestinations: destination.subdestinations,
            details: this.transformDestinationDetail(destination.details)
        }
        return newDestination;
    }
    transformDestinationDetail(destinationDetail: any): DestinationDetail {
        let newDestinationDetail : DestinationDetail = {
            id: destinationDetail.id,
            destinationID: destinationDetail.destinationID,
            description: destinationDetail.description,
            website: destinationDetail.website,
            address: destinationDetail.address,
            phone: destinationDetail.phone,
            tags: this.transformDestinationTags(destinationDetail.tags),
            lat: destinationDetail.lat,
            lng: destinationDetail.lng
        }
        return newDestinationDetail;
    }
    transformDestinationTags(destinationTags: any): DestinationTag[] {
        let newDestinationTags: DestinationTag[] = [];
        for (let i = 0; i < destinationTags.length; i++) {
            let destinationTag = destinationTags[i];
            let newDestinationTag = this.transformDestinationTag(destinationTag);
            newDestinationTags.push(newDestinationTag);
        }
        return newDestinationTags;
    }
    transformDestinationTag(destinationTag: any): DestinationTag {
        let newDestinationTag : DestinationTag = {
            id: destinationTag.id,
            name: destinationTag.name
        }
        return newDestinationTag;
    }

}

export {DestinationManager}