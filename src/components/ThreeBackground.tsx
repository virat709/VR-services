"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation over time
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -5]}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial color="#0ea5e9" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1.5} position={[4, -2, -8]}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial color="#f59e0b" distort={0.5} speed={1.5} roughness={0.1} metalness={0.9} />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={0.5} floatIntensity={3} position={[0, 4, -10]}>
        <Sphere args={[0.8, 64, 64]}>
          <MeshDistortMaterial color="#a855f7" distort={0.3} speed={3} roughness={0.3} metalness={0.7} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-night-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#0ea5e9" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <AnimatedGroup />
      </Canvas>
    </div>
  );
}
