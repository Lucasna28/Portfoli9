/* eslint-disable */
"use client";
import { useRef } from "react";
import type * as THREE from "three";
import { useFrame, Canvas } from "@react-three/fiber";
import { useScroll } from "framer-motion";

function FloatingGrid() {
  const gridRef = useRef<THREE.Group>();
  const scroll = useScroll();

  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.position.y = -scroll.scrollYProgress.get() * 20;
      gridRef.current.rotation.x = (scroll.scrollYProgress.get() * Math.PI) / 4;
    }
  });

  return (
    <group ref={gridRef}>
      {[...Array(20)].map((_, i) => (
        <group key={i} position={[0, i * 2 - 20, 0]}>
          {[...Array(20)].map((_, j) => (
            <mesh key={j} position={[j * 2 - 20, 0, 0]}>
              <boxGeometry args={[0.1, 0.1, 20]} />
              <meshBasicMaterial color={0x00ff00} opacity={0.1} transparent />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function FloatingCubes() {
  const cubesRef = useRef<THREE.Group>();
  const scroll = useScroll();

  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      cubesRef.current.position.y =
        Math.sin(state.clock.getElapsedTime()) * 0.5 - scroll.offset * 10;
    }
  });

  return (
    <group ref={cubesRef}>
      {[...Array(50)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 40 - 20,
            Math.random() * 40 - 20,
            Math.random() * 40 - 20,
          ]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshPhongMaterial color={0x00ffff} />
        </mesh>
      ))}
    </group>
  );
}

export default function ParallaxBackground() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingGrid />
        <FloatingCubes />
      </Canvas>
    </div>
  );
}
