import React from "react";
import { Boat } from "./Icons";
import "./styles/AnimatedBoat.scss";

interface boatProps {
    size: number;
}
function AnimatedBoat(props: boatProps) {
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

export default AnimatedBoat;
