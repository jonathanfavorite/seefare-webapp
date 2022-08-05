import React, {createContext, useState} from 'react'
import { DestinationModel, DestinationTag } from '../models/DestinationModel';

const AppContext = createContext<AppContextProps>(null as any);

interface AppContextProps {
    currentScreen: string,
    selectedCity: string,
    destinations: DestinationModel[],
    tags: DestinationTag[],
    UpdateCurrentScreen: (screen: string) => void,
    UpdateDestinations: (destinations: DestinationModel[]) => void,
    UpdateTags: (tags: DestinationTag[]) => void
}

function AppContextProvider(props: any) {
  
    const [currentScreen, setCurrentScreen] = useState('welcome');
    const [selectedCity, setSelectedCity] = useState<string>("Cape Coral, FL");
    const [destinations, setDestinations] = useState<DestinationModel[]>([]);
    const [tags, setTags] = useState<DestinationTag[]>([]);

    const UpdateCurrentScreen = (screen: string) => {
        setCurrentScreen(screen);
    };
    const UpdateDestinations = (destinations: DestinationModel[]) => {
        setDestinations(destinations);
    }
    const UpdateTags = (tags: DestinationTag[]) => {
        setTags(tags);
    }
    const UpdateSelectedCity = (city: string) => {
        setSelectedCity(city);
    }

    let contextList : any = {
        currentScreen,
        destinations,
        tags,
        selectedCity,
        UpdateCurrentScreen,
        UpdateDestinations,
        UpdateTags,
        UpdateSelectedCity
    }

    return <AppContext.Provider value={contextList}>
        {props.children}
    </AppContext.Provider>
}

export {AppContext, AppContextProvider};