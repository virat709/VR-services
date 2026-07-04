"use client";

import dynamic from "next/dynamic";

// Load ThreeBackground only on client — no SSR (WebGL requires a browser)
const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
});

export default function ThreeBackgroundClient() {
  return <ThreeBackground />;
}
