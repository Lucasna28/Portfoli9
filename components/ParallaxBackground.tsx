/* eslint-disable */
"use client";
import { useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { Group } from "three";

function FloatingGrid() {
  const gridRef = useRef<Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.position.y = -scroll.scrollYProgress.get() * 20;
      grid.rotation.x = (scroll.scrollYProgress.get() * Math.PI) / 4;
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
  const cubesRef = useRef<Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    const cubes = cubesRef.current;
    if (cubes) {
      cubes.rotation.y = state.clock.getElapsedTime() * 0.1;
      cubes.position.y =
        Math.sin(state.clock.getElapsedTime()) * 0.5 -
        scroll.scrollYProgress.get() * 10;
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
