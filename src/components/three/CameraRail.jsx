"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const scrollState = {
  speed: 0,
  targetSpeed: 0,
};

export default function CameraRail() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  // helper clamp
  const clamp = (v, min, max) =>
    Math.max(min, Math.min(max, v));

  useEffect(() => {
    const down = (e) => {
      if (e.button === 0) scrollState.targetSpeed = 0.6;
    };
    const up = (e) => {
      if (e.button === 0) scrollState.targetSpeed = 0;
    };

    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // FRAME LOOP
useFrame(() => {
  scrollState.speed +=
    (scrollState.targetSpeed - scrollState.speed) * 0.06;

  camera.position.z -= scrollState.speed;

  const END_Z = -53;
  if (camera.position.z < END_Z) {
    camera.position.z = END_Z;
    scrollState.speed = 0;
    scrollState.targetSpeed = 0;
  }

  const targetX = clamp(-mouse.current.y * 0.12, -0.12, 0.12);
  const targetY = clamp(-mouse.current.x * 0.2, -0.2, 0.2);

  camera.rotation.x += (targetX - camera.rotation.x) * 0.08;
  camera.rotation.y += (targetY - camera.rotation.y) * 0.08;
});


  return null;
}
