"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";

export default function Water() {
  // uniforms punya reference stabil
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, -20]}
    >
      <planeGeometry args={[50, 200, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;

          void main() {
            vUv = uv;
            vec3 pos = position;

            pos.z += sin(pos.x * 2.0 + uTime) * 0.15;
            pos.z += sin(pos.y * 3.0 + uTime) * 0.15;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;

          void main() {
            gl_FragColor = vec4(0.6, 0.75, 0.9, 0.7);
          }
        `}
        transparent
      />
    </mesh>
  );
}
