import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { AppContextProvider } from "./contexts/AppContext";
import { LoadingContextProvider } from "./contexts/LoadingContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppContextProvider>
    <LoadingContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoadingContextProvider>
  </AppContextProvider>
);
