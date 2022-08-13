import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext";
import { LoadingContextProvider } from "./contexts/LoadingContext";
import { MapContext, MapContextProvider } from "./contexts/MapContext";
import App from "./startup/App";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <AppContextProvider>
        <LoadingContextProvider>
            <MapContextProvider>
                <BrowserRouter>
                    <div id="master-container">
                        <App />
                    </div>
                </BrowserRouter>
            </MapContextProvider>
        </LoadingContextProvider>
    </AppContextProvider>
);
