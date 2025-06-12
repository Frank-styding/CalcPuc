"use client";

import { useState, useRef } from "react";

export const HeaderTitle = ({
  title,
  onLongPress,
}: {
  title: string;
  onLongPress?: () => void;
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    if (!onLongPress) return;

    setIsPressed(true);
    pressTimerRef.current = setTimeout(() => {
      onLongPress();
    }, 3000);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  return (
    <div className="w-screen h-[75px] relative">
      <div className="grid place-content-center absolute top-2 left-2"></div>
      <div
        className={`w-screen h-full grid place-content-center text-3xl text-[var(--color-dark3)] ${
          isPressed ? "bg-opacity-50" : ""
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        style={{ userSelect: "none" }}
      >
        {title}
      </div>
    </div>
  );
};
