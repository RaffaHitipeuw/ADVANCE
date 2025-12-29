"use client";

import { Canvas } from "@react-three/fiber";
import Tunnel from "./AboveWorld/Tunnel";
import Bridge from "./AboveWorld/Bridge";
import WaterSurface from "./WaterSurface";
import WaterWorld from "./UnderwaterWorld/WaterWorld";
import CameraRail from "./CameraRail";
import CameraLook from "./CameraLook";

export default function Scene() {
  return (
    <Canvas
      camera={{ fov: 60, near: 0.1, far: 300, position: [0, 0, 5] }}
    >
      <color attach="background" args={["#0b1c1f"]} />
      <ambientLight intensity={0.8} />

      <group>
        <Tunnel>
          <Bridge />
        </Tunnel>
      </group>
      <WaterSurface />
      <WaterWorld />

      <CameraRail />
      <CameraLook />
    </Canvas>
  );
}
