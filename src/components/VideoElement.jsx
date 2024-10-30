import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Html, Plane } from '@react-three/drei';
import { createPortal } from 'react-dom';
import './VideoElement.css';

function VideoElement({ videoSrc, position, scale, Videofullscreen }) {
  const videoRef = useRef();
  const videoTexture = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentScale, setCurrentScale] = useState(scale);

  useEffect(() => {
    if (!videoTexture.current) {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.crossOrigin = 'Anonymous';
      video.loop = true;
      video.muted = true;
      videoRef.current = video;
      videoTexture.current = new THREE.VideoTexture(video);
    }
  }, [videoSrc]);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      videoRef.current.muted = true;
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      videoRef.current.muted = false;
      setIsPlaying(true);
    }
  };

   
  const toggleMaximize = () => {
    videoRef.current.pause();
    videoRef.current.muted = true;
    setIsPlaying(false);
    Videofullscreen();  // Call fullscreen function from CanvasContainer
  };
  const portalRoot = document.getElementById('portal-root') || document.body;

  return (
    <>
      {!isMaximized && (
        <group position={position} scale={currentScale}>
          <Plane
            args={[16 / 2, 9 / 2]}
            position={[0, 0, 0]}
            onPointerDown={(e) => {
              e.stopPropagation();
              if (isPlaying) {
                togglePlayPause();
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
                  togglePlayPause();
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
                    <path
                      d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472 c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"
                    ></path>
                    <polygon points="192,336 352,256 192,176 "></polygon>
                    <circle
                      cx="256"
                      cy="256"
                      r="150"
                      stroke="#ffffff"
                      strokeWidth="0.5"
                      fill="none"
                    />
                    <circle
                      cx="256"
                      cy="256"
                      r="200"
                      stroke="#ffffff"
                      strokeWidth="0.5"
                      fill="none"
                    />
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
                      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                      stroke="#ffffff"
                      strokeWidth="1"
                    ></path>
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
      )}

      {isMaximized &&
        createPortal(
          <div
            className="fullscreen-video"
            onClick={toggleMaximize}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1000,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'slide-up 0.5s forwards',
            }}
          >
            <video
              src={videoSrc}
              ref={videoRef}
              autoPlay
              controls
              style={{
                width: '100%',
                maxWidth: '100%',
                maxHeight: '80%',
              }}
            />
            <div
              className="close-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize();
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                zIndex: 1001,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                width="36"
                height="36"
              >
                <path
                  d="M9.16998 14.83L14.83 9.17004"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M14.83 14.83L9.16998 9.17004"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>,
          portalRoot
        )}
    </>
  );
}

export default VideoElement;
