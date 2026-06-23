"use client";

import { useLayoutEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// CC-BY 3.0 — "Teeth" by Poly by Google (archived via get3dmodels.com)
useGLTF.preload("/models/teeth.glb");

function enhanceMaterials(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    child.castShadow = true;
    child.receiveShadow = true;

    const source = Array.isArray(child.material)
      ? child.material[0]
      : child.material;

    if (!(source instanceof THREE.MeshStandardMaterial)) return;

    const isGum =
      source.name.toLowerCase().includes("crayfish") ||
      source.name.toLowerCase().includes("gum");

    if (isGum) {
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c8827f"),
        roughness: 0.86,
        metalness: 0,
      });
      return;
    }

    child.material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#faf8f4"),
      roughness: 0.18,
      metalness: 0.02,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
  });
}

export function TeethModel() {
  const { scene } = useGLTF("/models/teeth.glb");
  const model = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    model.rotation.set(-Math.PI / 2, 0, Math.PI);
    enhanceMaterials(model);
  }, [model]);

  return <primitive object={model} />;
}
