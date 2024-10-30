// src/components/Box.js
import React from 'react';

function Box(props) {
  return (
    <mesh position={props.position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default Box;
