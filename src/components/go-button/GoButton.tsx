import React from 'react'
import "./GoButton.scss";
import { Link } from 'react-router-dom';
interface GoButtonProps {
    onClick?: () => void,
    link: string
}

export default function GoButton ({
  link = "#"
}) {
  return <>
  <div className='go_button_wrapper'>
  <Link to={link}>
    <div 
      className='go_button'>
        GO
    </div>
  </Link>
  </div>
  </>
}

interface GoButtonClickProps {
    onClick?: () => void,
}
function GoButtonWithClickEvent(props: GoButtonClickProps){
  return <>
<div className='go_button_wrapper' onClick={props.onClick}>
    <div 
      className='go_button'>
        GO
    </div>
  </div>
  </>
}

export {GoButton, GoButtonWithClickEvent}