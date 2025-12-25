import Wall from "./Wall";
import Gallery from "./Gallery";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "./CameraRail";

export default function Tunnel() {
  const group = useRef();
  const offset = useRef(0);
  const speed = useRef(0);

  const COUNT = 20;
  const SPACING = 4;
  const LOOP = COUNT * SPACING;

  useFrame(() => {
    if (!group.current) return;

    speed.current += (scrollState.speed - speed.current) * 0.1;
    offset.current += speed.current;

    group.current.children.forEach((child, i) => {
      let z = (i * SPACING + offset.current) % LOOP;
      child.position.z = -z;
    });
  });

  return (
    <group ref={group} frustumCulled={false}>
      {Array.from({ length: COUNT }).map((_, i) => (
        <group key={i} position={[0, 0, -i * SPACING]}>
          <Wall position={[-4, 0, 0]} />
          <Wall position={[4, 0, 0]} />
          <Gallery
            position={[
              i % 2 === 0 ? -2 : 2,
              0,
              0,
            ]}
          />
        </group>
      ))}
    </group>
  );
}
