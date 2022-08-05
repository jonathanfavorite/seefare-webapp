import React, {createContext, useState} from "react";

interface ContextListProps {
    loading: boolean,
    loadingText: string,
    UpdateLoading: (bool: boolean) => void,
    UpdateLoadingText: (text: string) => void
}

const LoadingContext = createContext<ContextListProps>(null as any);

function LoadingContextProvider(props: any) {

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Loading...");
    
    const UpdateLoading = (bool: boolean) => {
        setLoading(bool);
    }
    const UpdateLoadingText = (text: string) => {
        setLoadingText(text);
    }

    let contextList : ContextListProps = {
        loading,
        loadingText,
        UpdateLoading,
        UpdateLoadingText
    }

  return (
    <LoadingContext.Provider value={contextList}>
      {props.children}
    </LoadingContext.Provider>
  );
}

export {LoadingContext, LoadingContextProvider};
