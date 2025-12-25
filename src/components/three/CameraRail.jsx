"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const scrollState = {
  speed: 0,
};

export default function CameraRail() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "+=6000",
      scrub: true,
      onUpdate: (self) => {
        scrollState.speed = self.getVelocity() * 0.00006;
      },
    });
  }, []);

  return null;
}
