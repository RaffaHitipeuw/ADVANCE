"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const scrollState = {
  speed: 0,
  targetSpeed: 0,
  mode: "rail",
};

export default function CameraRail() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const clamp = (v, min, max) =>
    Math.max(min, Math.min(max, v));

  useEffect(() => {
    const down = (e) => {
      if (e.button !== 0) return;

      if (scrollState.mode === "bridgeHold") {
        scrollState.mode = "dive";
        scrollState.targetSpeed = 0;
      } else {
        scrollState.targetSpeed = 0.6;
      }
    };

    const up = () => {
      scrollState.targetSpeed = 0;
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

    if (scrollState.mode === "rail") {
      const dist = camera.position.z - END_Z;
      const slow = clamp(dist / STOP_RANGE, 0, 1);

      camera.position.z -= scrollState.speed * slow;

      if (dist <= 0.02) {
        camera.position.z = END_Z;
        scrollState.speed = 0;
        scrollState.targetSpeed = 0;
        scrollState.mode = "bridgeHold";
      }

      const rx = clamp(-mouse.current.y * 0.12, -0.12, 0.12);
      const ry = clamp(-mouse.current.x * 0.2, -0.2, 0.2);

      camera.rotation.x += (rx - camera.rotation.x) * 0.08;
      camera.rotation.y += (ry - camera.rotation.y) * 0.08;

      const BRIDGE_START = END_Z + 8;
      if (camera.position.z < BRIDGE_START) {
        let t =
          (camera.position.z - BRIDGE_START) /
          (END_Z - BRIDGE_START);

        t = clamp(t, 0, 1);
        const smooth = t * t * (3 - 2 * t);

        camera.position.y +=
          (smooth * 8.5 - camera.position.y) * 0.04;
      }
    }

    if (scrollState.mode === "bridgeHold") {
      camera.rotation.x +=
        (-0.05 - camera.rotation.x) * 0.03;
    }

    if (scrollState.mode === "dive") {
      camera.position.y +=
        (-12 - camera.position.y) * 0.03;

      camera.rotation.x +=
        (-0.6 - camera.rotation.x) * 0.03;

      camera.position.z -= 0.08;
    }
  });

  return null;
}
