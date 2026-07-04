"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollBackground() {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".bg-layer");

      layers.forEach((layer) => {
        gsap.to(layer, {
          y: () => -(layer.offsetHeight * 0.3),
          ease: "none",
          scrollTrigger: {
            trigger: layer.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const orbs = gsap.utils.toArray<HTMLElement>(".bg-orb");
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: i % 2 === 0 ? 60 : -60,
          y: i % 2 === 0 ? -40 : 40,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: orb.closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return <div ref={container} />;
}
