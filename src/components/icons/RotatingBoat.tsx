import React from "react";
import { Boat } from "./Icons";
import "./styles/RotatingBoat.scss";

interface boatProps {
    size: number;
}
function RotatingBoat(props: boatProps) {
  return (
    <div
      className="rock-the-boat"
      style={{
        width: props.size,
        height: props.size,
      }}
    >
      <Boat />
    </div>
  );
}

export default RotatingBoat;
