"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 32 }: LogoProps) {
  return (
    <div className="flex items-center gap-2" style={{ width: size, height: size }}>
      <Image 
        src="/vr-logo.png" 
        alt="VR Logo" 
        width={size} 
        height={size} 
        style={{ width: size, height: size, maxWidth: "100%" }}
        className="object-contain"
      />
    </div>
  );
}
