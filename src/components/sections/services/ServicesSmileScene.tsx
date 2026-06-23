"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, ContactShadows, Environment } from "@react-three/drei";
import { TeethModel } from "./TeethModel";

function Scene() {
  return (
    <>
      <color attach="background" args={["#faf9f7"]} />
      <Environment preset="studio" environmentIntensity={0.7} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[2.5, 5, 4]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 2.5, 2]} intensity={0.35} color="#e6fffa" />
      <directionalLight position={[0, 1.5, -3]} intensity={0.2} />

      <Bounds fit clip observe margin={1.1}>
        <TeethModel />
      </Bounds>

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.2}
        scale={6}
        blur={2.8}
        far={3}
      />
    </>
  );
}

export function ServicesSmileScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.15, 3.4], fov: 28 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      className="h-full w-full rounded-2xl"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
