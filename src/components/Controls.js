// src/components/Controls.js
import React from 'react';
import { OrbitControls } from '@react-three/drei';

function Controls() {
  return <OrbitControls enableRotate={false} enableZoom={false} />;
}

export default Controls;
