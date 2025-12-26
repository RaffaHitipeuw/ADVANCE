"use client";

export default function Bridge() {
  return (
    <group position={[0, -1, -90]} frustumCulled={false}>
      <mesh>
        <boxGeometry args={[6, 0.3, 20]} />
        <meshStandardMaterial color="#999999" />
      </mesh>

      <mesh position={[-3, 1, 0]}>
        <boxGeometry args={[0.2, 2, 20]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

      <mesh position={[3, 1, 0]}>
        <boxGeometry args={[0.2, 2, 20]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

      <mesh position={[0, 1.5, -10]}>
        <boxGeometry args={[6, 3, 0.5]} />
        <meshStandardMaterial color="#888888" />
      </mesh>

    </group>
  );
}
