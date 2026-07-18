"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        currentX = mouseX;
        currentY = mouseY;
        hasMoved = true;
      }
    };

    const updatePosition = () => {
      if (hasMoved) {
        // Smooth interpolation trail (Lerp)
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMouseMove);
    const animId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[550px] h-[550px] -mt-[275px] -ml-[275px] pointer-events-none z-0 rounded-full opacity-60 bg-[radial-gradient(circle,_rgba(14,165,233,0.14)_0%,_rgba(168,85,247,0.06)_45%,_transparent_75%)] blur-[50px]"
      style={{
        transform: "translate3d(-1000px, -1000px, 0)",
        willChange: "transform",
      }}
    />
  );
}
