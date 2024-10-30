import React, { useState, useEffect } from 'react';
import './ModelFiveComponent.css';

const ModelFiveComponent = ({ closefunction }) => {
  const [slideState, setSlideState] = useState(''); // Initially empty to avoid immediate animation
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
  ];

  const text = [
    ' In a world that’s changing faster than ever, our purpose acts as our North Star, guiding our 400,000 people — providing the context and meaning for the work we do every day. We help digital pioneers fight data piracy; guide governments through cash-flow crises; unlock new medical treatments with data analytics; and pursue high quality audits to build trust in financial markets and business. And now we’ve unified all our artificial intelligence (AI) innovation and development efforts under one platform.',
    ' The most suitable use cases will be for immersive applications that do not require...',
    ' The most suitable use cases will be for immersive applications that do not require...',
    'Advances in social VR games, next-gen storytelling, remote travel and education...',
    'VR experiences are more fit for dedicated spaces rather than communal settings...',
    ' In a world that’s changing faster than ever, our purpose acts as our North Star, guiding our 400,000 people — providing the context and meaning for the work we do every day. We help digital pioneers fight data piracy; guide governments through cash-flow crises; unlock new medical treatments with data analytics; and pursue high quality audits to build trust in financial markets and business. And now we’ve unified all our artificial intelligence (AI) innovation and development efforts under one platform',
  ];

  useEffect(() => {
    // Trigger slide-in animation when the component mounts
    setTimeout(() => {
      setSlideState('slide-in');
    }, 10); // Small delay to ensure initial render completes before adding the class
  }, []);

  // Trigger closing animation before actually closing
  const handleClose = () => {
    setSlideState('slide-out');
    // Wait for the slide-out animation to finish before actually closing
    setTimeout(() => {
      closefunction();
    }, 500); // Duration matches CSS transition
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={`five_model-container ${slideState}`}>
      <button className="five_close-btn" onClick={handleClose}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#000" strokeWidth="1.5"></path>
          <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
      </button>
      <div className="five_divider-line"></div>

      {/* Image and navigation buttons */}
      <div className="five_image-navigation">
        <button className="five_nav-button prev" onClick={handlePreviousImage}>
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="none">
            <circle className="cls-1" cx="256" cy="256" r="246" stroke="#ffffff" strokeWidth="20" />
            <polyline className="cls-1" points="333.82 411.63 178.18 256 333.82 100.37" />
          </svg>
        </button>
        <div className="five_image-container">
          <p className="five_image-text">{text[currentImageIndex]}</p>
          <img src={images[currentImageIndex]} alt="Slideshow" className="five_slideshow-image" />
        </div>
        <button className="five_nav-button next" onClick={handleNextImage}>
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="none">
            <circle className="cls-1" cx="256" cy="256" r="246" stroke="#ffffff" strokeWidth="20" />
            <polyline className="cls-1" points="178.18 411.63 333.82 256 178.18 100.37" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModelFiveComponent;
