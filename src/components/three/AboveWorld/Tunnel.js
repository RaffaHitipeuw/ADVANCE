import Wall from "../Wall";
import Gallery from "../Gallery";
import Bridge from "./Bridge";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "../CameraRail";

export default function Tunnel() {
  const group = useRef();
  const offset = useRef(0);

  const COUNT = 20;
  const SPACING = 4;
  const LOOP = COUNT * SPACING;

  useFrame(() => {
    scrollState.speed +=
      (scrollState.targetSpeed - scrollState.speed) * 0.08;
  
    offset.current -= scrollState.speed;
  
    group.current.children.forEach((child, i) => {
      const z = (i * SPACING + offset.current) % LOOP;
      child.position.z = -z;
    });
  });


  return (
    <group ref={group}>
      {Array.from({ length: COUNT }).map((_, i) => (
        <group key={i} position={[0, 0, -i * SPACING]}>
          
          <Wall position={[-4, 0, 0]} />
          <Wall position={[4, 0, 0]} />

          <Gallery
            position={[i % 2 === 0 ? -2 : 2, 0, 0]}
          />
          {i === 10 && <Bridge />}

        </group>
      ))}
    </group>
  );
}
