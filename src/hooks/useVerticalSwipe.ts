import { useState } from "react";

export default function useVerticalSwipe(ref: any) {
    const [text, setText] = useState("Ready");
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [swipedUp, setSwipedUp] = useState(false);
    const [swipedDown, setSwipedDown] = useState(false);
    const minSwipeDistance = 5;
    const onTouchStart = (e: any) => {
      setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
      setTouchStart(e.targetTouches[0].clientY);
    };
    const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientY);
    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isUpSwipe = distance > minSwipeDistance;
      const isDownSwipe = distance < -minSwipeDistance;
      setText(`Up: ${isUpSwipe} Down: ${isDownSwipe}`);
      if (isUpSwipe && ref.current) {
        setSwipedUp(true);
        setSwipedDown(false);
      }
      if (isDownSwipe && ref.current) {
        setSwipedUp(false);
        setSwipedDown(true);
      }
    };
    return { text, onTouchStart, onTouchMove, onTouchEnd, swipedUp, swipedDown };
  }
  