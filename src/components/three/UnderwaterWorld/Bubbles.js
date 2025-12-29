"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Bubbles() {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((b) => {
      b.position.y += 0.02;
      if (b.position.y > 5) b.position.y = -10;
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            Math.random() * -10,
            -60 + Math.random() * 10,
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#bdefff"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
