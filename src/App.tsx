import React from 'react';
import './styles/App.scss';
import './fonts/inter/inter.css';
import WelcomeSplash from './screens/welcome-splash/WelcomeSplash';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoardScreen from './screens/welcome-splash/dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <div id='master-container'>

      <Routes>
        <Route path="/" element={<WelcomeSplash />} />
        <Route path='/dashboard' element={<DashBoardScreen />} />
      </Routes>


    </div>
    </BrowserRouter>
    
  );
}

export default App;
