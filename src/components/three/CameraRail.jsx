"use client";

import { useEffect } from "react";

export const scrollState = {
  speed: 0,
  targetSpeed: 0,
};

export default function CameraRail() {
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.button === 0) {
        scrollState.targetSpeed = 0.5;
      }
    };

    const handleMouseUp = (e) => {
      if (e.button === 0) {
        scrollState.targetSpeed = 0;
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return null;
}
