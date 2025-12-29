import * as THREE from "three";

export default function WaterSurface() {
  return (
    <mesh
      position={[0, 0, -40]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[300, 300]} />
      <meshPhysicalMaterial
        color="#1b3b40"
        transparent
        opacity={0.85}
        transmission={0.9}
        roughness={0.15}
        thickness={1}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
