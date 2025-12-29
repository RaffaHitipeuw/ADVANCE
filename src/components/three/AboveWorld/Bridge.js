"use client";

import { useGLTF } from "@react-three/drei";

export default function Bridge() {
  const { scene } = useGLTF("/models/dummybridge.glb");

  return (
    <primitive
      object={scene}
      position={[0, 3, -90]}
      scale={1}
      rotation={[0, 0, 0]}
    />
  );
}
