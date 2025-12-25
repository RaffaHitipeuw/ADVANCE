"use client";

export default function Wall({ position }) {
  return (
    <mesh position={position} frustumCulled={false}>
      <boxGeometry args={[0.5, 4, 4]} />
      <meshStandardMaterial color="#e5e5e5" />
    </mesh>
  );
}
