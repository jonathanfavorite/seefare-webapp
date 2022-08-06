import React, { createRef, useEffect, useRef, useState } from "react";
import useVerticalSwipe from "../../hooks/useVerticalSwipe";
import "./Test.scss";

function Test() {
  const draggableRef = createRef<HTMLDivElement>();

  const dragHook = useVerticalSwipe(draggableRef);

  useEffect(() => {
    if(dragHook.swipedUp) { handleSwipedUp();}
    if(dragHook.swipedDown) { handleSwipedDown();}
  }, [dragHook.swipedUp]);

  function handleSwipedUp() {
    if(draggableRef.current) { draggableRef.current.style.height = "80vh"; }
  }
  function handleSwipedDown() {
    if(draggableRef.current) { draggableRef.current.style.height = "100px"; }
  }


  return (
    <div
      className="draggable-slider-wrap"
      ref={draggableRef}
      draggable={true}
      onTouchStart={dragHook.onTouchStart}
      onTouchMove={dragHook.onTouchMove}
      onTouchEnd={dragHook.onTouchEnd}
    >

      <div className="content">{dragHook.text}</div>
    </div>
  );
}

export default Test;

