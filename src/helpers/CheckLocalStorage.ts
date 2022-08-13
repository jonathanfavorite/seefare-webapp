import React, { useContext, useState } from "react";
import { DestinationModel, DestinationTag } from "../models/DestinationModel";

export type ReturnCheckedLocalStorage = {
    needToBeRedirected: boolean;
    destinations: DestinationModel[];
    tags: DestinationTag[];
};
export type CheckLocalStorageProps = {
    destinationHasValue: boolean;
    tagHasValue: boolean;
};

export class LocalStorageManager {

    static UpdateDestinationLocalStorage(destinations: DestinationModel[]) {
        localStorage.setItem("destinations", JSON.stringify(destinations));
    }
    static UpdateTagLocalStorage(tags: DestinationTag[]) {
        localStorage.setItem("tags", JSON.stringify(tags));
    }

    static CheckLocalStorage = (
        props: CheckLocalStorageProps
    ): ReturnCheckedLocalStorage => {
        console.log(props.destinationHasValue);
        console.log(props.tagHasValue);
        let response: ReturnCheckedLocalStorage = {
            needToBeRedirected: false,
            destinations: [],
            tags: [],
        };
        let hasDestinationsInContext: boolean = props.destinationHasValue;
        let hasTagsInContext: boolean = props.tagHasValue;

        if (hasDestinationsInContext && hasTagsInContext) {
            return response;
        } else {
            let doesDestinationLocalStorageExist: boolean =
                localStorage.getItem("destinations") ? true : false;
            let doesTagLocalStorageExist: boolean = localStorage.getItem("tags")
                ? true
                : false;
            if (doesDestinationLocalStorageExist || doesTagLocalStorageExist) {
                response.destinations = JSON.parse(
                    localStorage.getItem("destinations") as string
                );
                response.tags = JSON.parse(
                    localStorage.getItem("tags") as string
                );
            } else {
                response.needToBeRedirected = true;
            } 
        }
        return response;
    };
}