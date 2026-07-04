"use client";

import { useRef, useEffect } from "react";

interface Foil {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  rot: number;
  rotSpeed: number;
  driftSpeed: number;
  opacity: number;
  hue: number;
  light: number;
}

function createFoil(canvasW: number, canvasH: number): Foil {
  return {
    x: Math.random() * canvasW,
    y: -30 - Math.random() * canvasH * 0.5,
    w: 4 + Math.random() * 8,
    h: 2 + Math.random() * 5,
    speed: 0.6 + Math.random() * 1.2,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.06,
    driftSpeed: (Math.random() - 0.5) * 0.4,
    opacity: 0.5 + Math.random() * 0.4,
    hue: 35 + Math.random() * 15,
    light: 50 + Math.random() * 20,
  };
}

export default function GoldFall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let foils: Foil[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 100; i++) {
      const f = createFoil(canvas.width, canvas.height);
      f.y = Math.random() * canvas.height;
      foils.push(f);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (foils.length < 150 && Math.random() < 0.2) {
        foils.push(createFoil(canvas.width, canvas.height));
      }

      for (let i = foils.length - 1; i >= 0; i--) {
        const f = foils[i];
        f.y += f.speed;
        f.rot += f.rotSpeed;
        f.x += f.driftSpeed;

        if (f.y > canvas.height + 30) {
          foils.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rot);
        ctx.globalAlpha = f.opacity;

        ctx.shadowColor = `hsla(${f.hue}, 85%, 55%, 0.4)`;
        ctx.shadowBlur = 6;

        ctx.fillStyle = `hsl(${f.hue}, 85%, ${f.light}%)`;
        ctx.fillRect(-f.w / 2, -f.h / 2, f.w, f.h);
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}
