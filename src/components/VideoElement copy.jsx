import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Html, Plane } from '@react-three/drei';
import { createPortal } from 'react-dom';
import './VideoElement.css';

function VideoElement({ videoSrc, position, scale, Videofullscreen, videoRef }) {
  const videoTexture = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentScale, setCurrentScale] = useState(scale);

  useEffect(() => {
    if (videoRef.current) {
      videoTexture.current = new THREE.VideoTexture(videoRef.current);
    }
  }, [videoRef]);

  const togglePlayPause = () => {
    if (videoRef.current) {  // Ensure videoRef is initialized
      if (isPlaying) {
        videoRef.current.pause();
        videoRef.current.muted = true;
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        videoRef.current.muted = false;
        setIsPlaying(true);
      }
    }
  };

  const toggleMaximize = () => {
    Videofullscreen();  // Trigger fullscreen
  };

  return (
    <>
      <group position={position} scale={currentScale}>
        <Plane
          args={[16 / 2, 9 / 2]}
          position={[0, 0, 0]}
          onPointerDown={(e) => {
            e.stopPropagation();
            if (isPlaying) {
              togglePlayPause();  // Safely toggle play/pause
            }
          }}
        >
          {videoTexture.current && (
            <meshBasicMaterial map={videoTexture.current} />
          )}
        </Plane>

        {!isPlaying && (
          <Html position={[0, 0, 0]} center>
            <div
              className="play-button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();  // Safely toggle play/pause
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                cursor: 'pointer',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '3px solid white',
                backgroundColor: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                stroke="#ffffff"
                width="36"
                height="36"
              >
                <g id="SVGRepo_iconCarrier">
                  <polygon points="192,336 352,256 192,176 "></polygon>
                </g>
              </svg>
            </div>
          </Html>
        )}

        {isPlaying && (
          <Html position={[2.5, 1, 0]} center>
            <div
              className="maximize-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize();
              }}
              style={{
                position: 'absolute',
                top: '-52px',
                right: '-60px',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M17 7H14M17 7V10M17 7L13.5 10.5M7 17H10M7 17V14M7 17L10.5 13.5"
                    stroke="#ffffff"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
          </Html>
        )}
      </group>
    </>
  );
}

export default VideoElement;
