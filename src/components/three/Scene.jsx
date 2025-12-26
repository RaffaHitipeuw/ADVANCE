"use client";

import { Canvas } from "@react-three/fiber";
import Tunnel from "./Tunnel";
import CameraRail from "./CameraRail";
import Water from "./Water";
import Bridge from "./Bridge";
import CameraLook from "./CameraLook";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{
        position: "fixed",
        inset: 0,
      }}
    >
      <ambientLight intensity={1} />
      <Tunnel>
        <Bridge />
      </Tunnel>
      <Water />
      <CameraRail />
      <CameraLook />
    </Canvas>
  );
}
