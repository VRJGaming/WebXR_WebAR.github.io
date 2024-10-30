import React, { useRef, useMemo } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Water } from "three-stdlib";

extend({ Water });

const WaterSurface = () => {
  const { gl, scene, camera } = useThree();

  // High-quality water normals texture for realistic ripples
  const waterNormals = useMemo(
    () =>
      new THREE.TextureLoader().load("/Images/waternormals.jpg", (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;  // Ensures the texture repeats
        texture.anisotropy = gl.capabilities.getMaxAnisotropy(); // Max anisotropy for better reflections
      }),
    [gl]
  );

  // Higher geometry resolution for smoother waves and reflections
  const waterGeometry = useMemo(() => new THREE.PlaneGeometry(1000, 1000, 512, 512), []);

  const waterRef = useRef();

  // Configure water material for more reflection and high-quality refraction
  const waterMaterialConfig = useMemo(
    () => ({
      textureWidth: 2048,  // Higher texture resolution for better reflections
      textureHeight: 2048,
      waterNormals,
      sunDirection: new THREE.Vector3(1, 1, 1),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 1 ,  // Subtle distortion for more realistic waves
      fog: scene.fog !== undefined,
      reflectivity: 0,  // High reflectivity for a mirror-like surface
      refractionRatio: 0,  // Clear refraction
    }),
    [waterNormals, scene.fog]
  );

  // Animate the water surface
  useFrame((state, delta) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms.time.value += delta * 0.05; // Slow wave animation for calmness
      waterRef.current.material.uniforms.eye.value = camera.position;
    }
  });

  return (
    <water
      ref={waterRef}
      args={[waterGeometry, waterMaterialConfig]}
      rotation={[-Math.PI / 2, 0, 0]}  // Flat plane
      position={[0, -1, 0]}  // Adjust height
    />
  );
};

export default WaterSurface;
