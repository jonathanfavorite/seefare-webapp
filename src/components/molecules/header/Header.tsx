import React, { useContext } from 'react'
import { AppContext } from '../../../contexts/AppContext';
import { DownArrow } from '../../atoms/icons/Icons';
import Logo from '../../atoms/logo/Logo';

import "./Header.scss";

function Header() {
  const appCtx = useContext(AppContext);
  return (
    <div className="header">
    <div className="logo-wrap">
      <Logo />
    </div>
    <div className="location-wrap">
      <div className="location-text">{appCtx.selectedCity}</div>
      <div className="location-icon"><DownArrow /></div>
    </div>
  </div>
  )
}

export default Header