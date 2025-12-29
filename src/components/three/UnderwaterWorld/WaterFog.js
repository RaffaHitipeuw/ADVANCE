"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function WaterFog() {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog("#0a2a33", 100, 300);

    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
}
