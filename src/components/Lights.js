// src/components/Lights.js
import React from 'react';

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
    </>
  );
}

export default Lights;
