import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const Model = ({ path, position }) => {
  const { scene } = useGLTF(path); // Load the model

  return (
    <Suspense fallback={null}>
      <primitive object={scene} position={position} />
    </Suspense>
  );
};

export default Model;
