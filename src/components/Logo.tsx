"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 32 }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Image 
        src="/vr-logo.png" 
        alt="VR Logo" 
        width={size} 
        height={size} 
        className="object-contain"
      />
    </div>
  );
}
