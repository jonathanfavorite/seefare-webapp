import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../components/pages/dashboard/DashboardPage";
import WelcomePage from "../components/pages/welcome/WelcomePage";
import '../fonts/inter/inter.css';
import '../styles/App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
