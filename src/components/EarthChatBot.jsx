import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

function EarthChatBot({chatbotclick}) {
  const { scene, animations } = useGLTF('/models/Earth_ChatBot.glb'); // Load the GLB model
  const ref = useRef();
  const { actions } = useAnimations(animations, ref); // Hook to manage animations

  // Rotate the model using useFrame
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Simple manual rotation on the Y-axis
    }
  });

  React.useEffect(() => {
    if (actions) {
      // Play the first animation if necessary
      // actions[Object.keys(actions)[0]].play();
    }
  }, [actions]);

  return <primitive  object={scene} ref={ref} scale={0.5} position={[8.3, -4, 4]}
  onPointerDown={chatbotclick} // Handle click event
  />;
}

export default EarthChatBot;