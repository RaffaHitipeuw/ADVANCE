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

useFrame(() => {
  scrollState.speed +=
    (scrollState.targetSpeed - scrollState.speed) * 0.04;

  const END_Z = -40;
  const STOP_RANGE = 6;

  const distToEnd = camera.position.z - END_Z;
  const slowFactor = clamp(distToEnd / STOP_RANGE, 0, 1);

  const effectiveSpeed = scrollState.speed * slowFactor;
  camera.position.z -= effectiveSpeed;

  if (distToEnd <= 0.01) {
    camera.position.z = END_Z;
    scrollState.speed = 0;
    scrollState.targetSpeed = 0;
  }

  const targetRotX = clamp(-mouse.current.y * 0.12, -0.12, 0.12);
  const targetRotY = clamp(-mouse.current.x * 0.2, -0.2, 0.2);

  camera.rotation.x +=
    (targetRotX - camera.rotation.x) * 0.08;
  camera.rotation.y +=
    (targetRotY - camera.rotation.y) * 0.08;

  const BRIDGE_START_Z = END_Z + 8;

  if (camera.position.z < BRIDGE_START_Z) {
    let t =
      (camera.position.z - BRIDGE_START_Z) /
      (END_Z - BRIDGE_START_Z);

    t = clamp(t, 0, 1);

    const smoothT =
      t * t * t * (t * (6 * t - 15) + 10);

    const BRIDGE_HEIGHT = 8.5;
    const targetY = smoothT * BRIDGE_HEIGHT;

    camera.position.y +=
      (targetY - camera.position.y) * 0.035;
  }
});




  return null;
}
