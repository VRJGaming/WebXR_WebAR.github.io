// CanvasContainer.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Html,
  useGLTF,
  useAnimations,
} from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import './CanvasContainer.css';
import WaterSurface from './WaterSurface';
import VideoElement from './VideoElement';
import EarthChatBot from './EarthChatBot.jsx';
import ModelOneComponent from "./ModelOneComponent.jsx";
import ModelTwoComponent from './ModelTwoComponent.jsx';
import ModelThreeComponent from './ModelThreeComponent.jsx';
import ModelFourComponent from './ModelFourComponent.jsx';
import ModelFiveComponent from './ModelFiveComponent.jsx';

const models = [
  {
    path: '/models/CEO_message.glb',
    text: 'Model 1 Description one',
    imgSrc: '/images/image1.jpg',
    position: [2, -3.5, -8],
    scale: [1.3, 1.3, 1.3],
    rotation: [0, -1.5, 0],
  },
  {
    path: '/models/Icon2_Approach.glb',
    text: 'Model 2 Description',
    imgSrc: '/images/image2.jpg',
    position: [10, -3.5, -8],
    scale: [3, 3, 3],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    path: null,
    text: 'Video Element',
    imgSrc: '/images/image3.jpg',
    position: [22, 4, -8],
    scale: [1, 1, 1],
    rotation: [0, Math.PI / 2, 0],
  }, // Video element
  {
    path: '/models/GHG.glb',
    imgSrc: '/images/image4.jpg',
    text: 'Model 3 Description',
    position: [32, -3.5, -8],
    scale: [2, 2, 2],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    path: '/models/Innovation (2).glb',
    imgSrc: '/images/image5.jpg',
    text: 'Model 4 Description',
    position: [40, -3.5, -8],
    scale: [2, 2, 2],
    rotation: [0, -1.3, 0],
    hasAnimation: true,
  },
  {
    path: '/models/Icon5_SDG.glb',
    imgSrc: '/images/image6.jpg',
    text: 'Model 5 Description',
    position: [47, -3.1, -8],
    scale: [3.25, 3.25, 3.25],
    rotation: [0, Math.PI / 2, 0],
  },
];

function CanvasContainer() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [nearestModelIndex, setNearestModelIndex] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [loadedContent, setLoadedContent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [infodottext, setinfodottext] = useState(true);
  const [showStartText, setShowStartText] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const cameraRef = useRef();
  const [targetCameraPosition, setTargetCameraPosition] = useState({ x: 0, y: 0 });

const [previousCameraPosition, setPreviousCameraPosition] = useState(null); // State to store previous position

const [lastClickedModelIndex, setLastClickedModelIndex] = useState(0); // Track the last clicked model

  const handleMouseMove = (event) => {
    const { innerWidth, innerHeight } = window;
    const xPos = (event.clientX / innerWidth - 0.5) * 2;
    const yPos = -(event.clientY / innerHeight - 0.5) * 2;
    setTargetCameraPosition({ x: xPos * 0.5, y: yPos * 0.5 });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const dragLimitLeft = models[0].position[0] - 5;
  const dragLimitRight = models[models.length - 1].position[0] + 5;

  const bind = useDrag(
    ({ offset: [mx], memo = dragX }) => {
      const dragSpeed = 0.02;
      let newDragX = -mx * dragSpeed;
      newDragX = Math.max(dragLimitLeft, Math.min(newDragX, dragLimitRight));
      setDragX(newDragX);
      updateNearestModel(newDragX);
      return memo;
    },
    {
      axis: 'x',
      onStart: () => {
        setIsDragging(true);
        setinfodottext(true);
        setShowStartText(false);
      },
      onEnd: () => {
        setIsDragging(false);
      },
    }
  );

  const updateNearestModel = (dragXValue) => {
    const distances = models.map((model) => {
      const adjustedPositionX = model.position[0] - dragXValue;
      return Math.abs(adjustedPositionX);
    });
    const closestIndex = distances.indexOf(Math.min(...distances));
    setNearestModelIndex(closestIndex);
  };

  const animateCameraAndDrag = (newDragX, targetCameraZ, duration = 1) => {
    const startDragX = dragX;
    const startCameraZ = cameraRef.current.position.z;
  
    let startTime = null;
  
    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const t = Math.min(elapsed / duration, 1); // Normalized time (0 to 1)
  
      // Apply easing (ease in-out effect)
      const easedT = t * (2 - t); // Simple easing function
  
      // Linear interpolation for dragX
      setDragX(startDragX + (newDragX - startDragX) * easedT);
  
      // Linear interpolation for camera Z position
      cameraRef.current.position.z = startCameraZ + (targetCameraZ - startCameraZ) * easedT;
  
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };
  
    requestAnimationFrame(animate);
  };
  
  
   
  
  

  
  // const handleCloseComponent = () => {
  //   setActiveComponent(null);
  //   resetCamera(); // Reset the camera position when closing the active component
  // };
  
  
  const animateCameraToModel = (targetDragX, targetCameraZ, duration = 1) => {
    const startDragX = dragX;
    const startCameraZ = cameraRef.current.position.z;
  
    let startTime = null;
  
    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const t = Math.min(elapsed / duration, 1); // Normalized time (0 to 1)
  
      // Apply easing (ease in-out effect)
      const easedT = t * (2 - t); // Simple easing function
  
      // Linear interpolation for dragX
      setDragX(startDragX + (targetDragX - startDragX) * easedT);
  
      // Linear interpolation for camera Z position
      cameraRef.current.position.z = startCameraZ + (targetCameraZ - startCameraZ) * easedT;
  
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };
  
    requestAnimationFrame(animate);
  };
  
  const resetCamera = () => {
    const selectedModel = models[lastClickedModelIndex];
    if (!selectedModel) return;
  
    const targetPositionX = selectedModel.position[0]; // Target X position based on the model
    const resetZ = 20; // Default Z-axis reset position (camera distance)
  
    const initialCameraX = cameraRef.current.position.x;
    const initialCameraZ = cameraRef.current.position.z;
    const duration = 1; // Duration of the animation in seconds
  
    let startTime = null;
  
    const animateReset = (time) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const t = Math.min(elapsed / duration, 1); // Normalized time (0 to 1)
  
      // Apply easing for smooth transition (ease-in-out cubic)
      const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  
      // Update camera X and Z position smoothly
      //  cameraRef.current.position.x = initialCameraX + (targetPositionX - initialCameraX) * easedT;
      //cameraRef.current.position.x = models[lastClickedModelIndex+1].position[lastClickedModelIndex+1];
      cameraRef.current.position.z = initialCameraZ + (resetZ - initialCameraZ) * easedT;
  
      // Continue the animation if not yet finished
      if (t < 1) {
        requestAnimationFrame(animateReset);
      }
    };
  
    requestAnimationFrame(animateReset);
  };
  
  const handleModelClick = (index) => {
    setinfodottext(false);
    const selectedModel = models[index];
    const leftmostPositionX = -5.5; // Desired X position to bring the model to the left side
    const newDragX = selectedModel.position[0] - leftmostPositionX;
  
    // Set the last clicked model index
    setLastClickedModelIndex(index);
  
    // Set the nearest model index and content
    setNearestModelIndex(index);
    setLoadedContent(models[index]);
  
    // Define a target camera position for UI display (closer zoom)
    const targetCameraZ = 10; // Move closer to the models for displaying UI
  
    // Animate dragX and camera movement smoothly
    animateCameraToModel(newDragX, targetCameraZ);
  
    // Determine the component to display based on the clicked index
    switch (index) {
      case 0:
        setActiveComponent(<ModelOneComponent closefunction={() => handleCloseComponent()} />);
        break;
      case 1:
        setActiveComponent(<ModelTwoComponent closefunction={() => handleCloseComponent()} />);
        break;
      case 2:
        break;
      case 3:
        setActiveComponent(<ModelThreeComponent closefunction={() => handleCloseComponent()} />);
        break;
      case 4:
        setActiveComponent(<ModelFourComponent closefunction={() => handleCloseComponent()} />);
        break;
      case 5:
        setActiveComponent(<ModelFiveComponent closefunction={() => handleCloseComponent()} />);
        break;
      default:
        setActiveComponent(null);
        break;
    }
  };
  
  const handleCloseComponent = () => {
    setinfodottext(true);
    setActiveComponent(null);
    resetCamera(); // Reset the camera position when closing the active component
  };
  
  const animateModelNavigation = (newDragX, duration = 1) => {
    const startDragX = dragX;
  
    let startTime = null;
  
    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const t = Math.min(elapsed / duration, 1); // Normalized time (0 to 1)
  
      // Apply easing (ease in-out effect)
      const easedT = t * (2 - t); // Simple easing function
  
      // Linear interpolation for dragX
      setDragX(startDragX + (newDragX - startDragX) * easedT);
  
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };
  
    requestAnimationFrame(animate);
  };
  
  const navigateModel = (direction) => {
    const newIndex = (nearestModelIndex + direction + models.length) % models.length;
    const modelPositionX = models[newIndex].position[0];
    setNearestModelIndex(newIndex);
  
    // Animate the transition to the new model
    animateModelNavigation(modelPositionX);
  };
  

  // const navigateModel = (direction) => {
  //   const newIndex = (nearestModelIndex + direction + models.length) % models.length;
  //   const modelPositionX = models[newIndex].position[0];
  //   setDragX(modelPositionX);
  //   setNearestModelIndex(newIndex);
  // };

  const handleClose = () => {
    setLoadedContent(null);
  };

  const videoFullscreenclick = () => {
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const cursorStyle = isDragging ? 'grabbing' : hovered !== null ? 'pointer' : 'grab';

  const [textAnimation, setTextAnimation] = useState('fade-in');
  const [prevModelIndex, setPrevModelIndex] = useState(nearestModelIndex);

  useEffect(() => {
    if (prevModelIndex !== nearestModelIndex) {
      setTextAnimation('fade-out');
      setTimeout(() => {
        setTextAnimation('fade-in');
        setPrevModelIndex(nearestModelIndex);
      }, 500);
    }
  }, [nearestModelIndex, prevModelIndex]);

  const handleChatbotClick = () => {
    alert('Chatbot clicked!');
  };

  return (
    <div
      className="canvas-container"
      style={{ position: 'relative', height: '100vh', width: '100vw', cursor: cursorStyle }}
    >
      {showStartText && (
        <div
          className="start-overlay"
          style={{
            position: 'absolute',
            bottom: '1%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h1 style={{ fontSize: '2.5rem', color: 'white' }}>Drag to move</h1>
          <p style={{ color: 'white' }}>Drag left on the screen to explore</p>
          <h2>Sustainability report</h2>
        </div>
      )}

      <div
        {...bind()}
        className="gesture-area"
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, 20]}
            fov={35}
            near={0.1}
            far={1000}
          />
          <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <MouseBasedCameraMovement cameraRef={cameraRef} targetPosition={targetCameraPosition} />

          {models.map((model, index) => (
            <React.Fragment key={index}>
              {model.path ? (
                <InteractiveModel
                  path={model.path}
                  position={[
                    model.position[0] - dragX,
                    model.position[1],
                    model.position[2],
                  ]}
                  scale={model.scale}
                  rotation={model.rotation}
                  index={index}
                  hovered={hovered}
                  setHovered={setHovered}
                  handleModelClick={handleModelClick}
                  hasAnimation={model.hasAnimation}
                />
              ) : (
                <VideoElement
                  position={[
                    model.position[0] - dragX,
                    model.position[1],
                    model.position[2],
                  ]}
                  scale={[1, 1, 1]}
                  videoSrc={'/Energex_ Pioneering Sustainable Energy Solutions Copy.mp4'}
                  Videofullscreen={videoFullscreenclick}
                />
              )}

              {/* Spot circles */}
              {model.path && (
                <Html
                  position={[
                    model.position[0] - dragX,
                    model.position[1] + 2,
                    model.position[2],
                  ]}
                  center
                >
                  <div
                    className={`spot__content ${hovered === index ? 'fade-out' : 'fade-in'}`}
                    style={{
                      position: 'relative',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 20,
                    }}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div
                      className="spot__point"
                      style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    ></div>
                    <div
                      className="spot__circle"
                      style={{
                        width: '30px',
                        height: '30px',
                        border: '1px solid rgba(255, 255, 255, 1)',
                        borderRadius: '50%',
                      }}
                    ></div>
                    <div
                      className="spot__circle"
                      style={{
                        width: '60px',
                        height: '60px',
                        border: '1px solid rgba(255, 255, 255, 0.7)',
                        borderRadius: '50%',
                      }}
                    ></div>
                    <div
                      className="spot__circle"
                      style={{
                        width: '90px',
                        height: '90px',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        borderRadius: '50%',
                      }}
                    ></div>
                  </div>
                </Html>
              )}
            </React.Fragment>
          ))}
<group>
          <StageDesign dragX={dragX} />
          </group>
          <group position={[0, -3.8, 0]}>
            <WaterSurface />
          </group>

          <Environment preset="dawn" background />

          <EarthChatBot chatbotclick={handleChatbotClick} />
        </Canvas>
      </div>

      {/* Video full screen */}
      {isFullScreen && (
        <div className="fullscreen-video-overlay">
          <div className="video-container">
            <button className="close-btn" onClick={closeFullScreen}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
              >
                <path
                  d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                <path
                  d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <video
              controls autoPlay
              controlsList="nodownload"
              style={{ width: '100%', height: '100%' }}
              muted={false}
            >
              <source src="\Energex_ Pioneering Sustainable Energy Solutions Copy.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
      {infodottext && (
        <div className="info-dot-text" style={{ color: 'white', fontSize: 5 }}>
          <div
            className="info-container"
            style={{
              position: 'absolute',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            <button onClick={() => navigateModel(-1)} className="nav-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
              >
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
              </svg>
            </button>
            <p className={`model-description ${textAnimation}`}>
              {models[nearestModelIndex].text}
            </p>
            <button onClick={() => navigateModel(1)} className="nav-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            </button>
          </div>

          <div
            className="dotted-navigation-wrapper"
            style={{
              position: 'absolute',
              bottom: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            <div className="line left-line"></div>
            <div className="dotted-navigation">
              {models.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === nearestModelIndex ? 'active' : ''}`}
                  onClick={() => navigateModel(index - nearestModelIndex)}
                />
              ))}
            </div>
            <div className="line right-line"></div>
          </div>
        </div>
      )}

      {/* Show active component based on model click */}
     

      {loadedContent && (
        // <div className="sideContant" style={{ zIndex: 6, alignItems: 'center', justifyContent: 'center' }}>
        //   <div className="description ">
        //     <div className="loaded-content" style={{ position: 'relative', zIndex: 6, width: '70%' }}>
        //       <p>{loadedContent.text}</p>
        //       <img
        //         src={loadedContent.imgSrc}
        //         alt={loadedContent.text}
        //         style={{
        //           width: 'auto',
        //           height: 'auto',
        //           objectFit: 'cover',
        //         }}
        //       />
        //       <button onClick={handleClose} className="closeButton">
        //         Close
        //       </button>
        //     </div>
        //   </div>
          
        // </div>
        activeComponent
        
      )}
    </div>
  );
}

function StageDesign({ dragX }) {
  const modelRef = useRef();
  const { scene, animations } = useGLTF('/models/StageDesign__B .glb');
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (actions) {
      // Play all animations or select specific ones
      Object.values(actions).forEach((action) => {
        action.play();
      });
    }
  }, [actions]);

  return (
    <group
      ref={modelRef}
      position={[-dragX - -22, -5, -10]}
      scale={[1.75, 1.75, 1.75]}
      rotation={[0, 1.6, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}

function InteractiveModel({
  path,
  position,
  scale,
  rotation,
  index,
  hovered,
  setHovered,
  handleModelClick,
  hasAnimation,
}) {
  const modelRef = useRef();
  const { scene, animations } = useGLTF(path);
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (hasAnimation && actions) {
      // Play the first available animation
      actions[Object.keys(actions)[0]]?.play();
    }
  }, [hasAnimation, actions]);

  useFrame(() => {
    if (!hasAnimation && hovered === index && modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Rotate on hover if the model doesn't have an animation
    }
  });

  return (
    <group
      ref={modelRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onPointerOver={() => setHovered(index)}
      onPointerOut={() => setHovered(null)}
      onClick={() => handleModelClick(index)}
    >
      <primitive object={scene} />
    </group>
  );
}

function MouseBasedCameraMovement({ cameraRef, targetPosition }) {
  useFrame(() => {
    if (cameraRef.current) {
      const smoothingFactor = 0.05;
      cameraRef.current.position.x += (targetPosition.x - cameraRef.current.position.x) * smoothingFactor;
      cameraRef.current.position.y += (targetPosition.y - cameraRef.current.position.y) * smoothingFactor;
    // Log the camera's position every frame
    console.log(`Camera position: x=${cameraRef.current.position.x.toFixed(2)}, y=${cameraRef.current.position.y.toFixed(2)}, z=${cameraRef.current.position.z.toFixed(2)}`);
  
    }
  });

  return null;
}

export default CanvasContainer;

