"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Gallery({ position }) {
  const ref = useRef();
  const targetScale = useRef(1);
  const tmp = new THREE.Vector3();

  useFrame(() => {
    if (!ref.current) return;

    ref.current.getWorldPosition(tmp);
    const z = tmp.z;

    if (z < -4 && z > -12) {
      targetScale.current = 1.2;
    } else {
      targetScale.current = 1;
    }

    ref.current.scale.lerp(
      new THREE.Vector3(
        targetScale.current,
        targetScale.current,
        targetScale.current
      ),
      0.1
    );
  });

  return (
    <mesh
      ref={ref}
      position={position}
      frustumCulled={false}
    >
      <boxGeometry args={[3, 2, 0.2]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}
