import React from "react";
import "./GoButton.scss";
import { Link } from "react-router-dom";

interface GoButtonProps {
  onClick?: () => void;
  link?: string;
}

export default function GoButton(
  props: GoButtonProps,
  { link = "#", onClick = () => {} }
) {
  let finalLink : string = "#";
  if(props.link)
  {
    finalLink = props.link;
  }
  return (
    <>
      <div className="go_button_wrapper">
        <Link to={finalLink}>
          <div className="go_button" onClick={props.onClick}>
            GO
          </div>
        </Link>
      </div>
    </>
  );
}

export { GoButton };
