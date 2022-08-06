import React, { useContext, useEffect } from "react";
import "./styles/App.scss";
import "./fonts/inter/inter.css";
import WelcomeSplash from "./screens/welcome-splash/WelcomeSplash";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardScreen from "./screens/dashboard/Dashboard";
import {
  LoadingContext,
  LoadingContextProvider,
} from "./contexts/LoadingContext";
import { MapContextProvider } from "./contexts/MapContext";
import Test from "./screens/test/Test";


function App() {

  return (
    <div id="master-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <WelcomeSplash />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <MapContextProvider>
              <DashBoardScreen />
            </MapContextProvider>
          }
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
