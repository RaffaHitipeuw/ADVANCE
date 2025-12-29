"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function Water() {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog("#0a2a33", 0, 25);
  }, [scene]);

  return (
    <>
      <mesh position={[0, 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#1a3a44"
          transparent
          opacity={0.85}
        />
      </mesh>

      <group position={[0, -6, 0]}>
        {Array.from({ length: 40 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 6,
              Math.random() * -10,
              (Math.random() - 0.5) * 6,
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#cceeff"
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
