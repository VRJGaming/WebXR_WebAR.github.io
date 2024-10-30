import React, { useState, useEffect } from 'react';
import './ModelThreeComponent.css';

const ModelThreeComponent = ({ closefunction }) => {
  const [slideState, setSlideState] = useState(''); // Initially empty to avoid immediate animation

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

  return (
    <div className={`three_model-container ${slideState}`}>
      <button className="three_close-btn" onClick={handleClose}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#000" strokeWidth="1.5"></path>
          <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
      </button>
      <div className="three_divider-line"></div>

      {/* Heading and Text */}
      <p className="three_content-paragraph">
        VR’s future growth will hinge on creating applications for consumers and enterprises that take full advantage of the immersive medium and encourage repeat usage. Advances in social VR games, next-gen storytelling, remote travel and education, and enterprise training and collaboration could all help drive adoption. However, if VR use cases overindex on its novelty, or if applications are hard to scale or simply work better on other devices, it’s unlikely to reach the adoption rate of other consumer devices. VR hardware and software providers understand this: In 2023, we expect the industry to progress greatly in identifying the specific consumer and enterprise applications for which VR is optimal, able to address needs not currently being met by other devices or, indeed, by real-world experiences.
      </p>
      <p className="three_content-paragraph">
        The most suitable use cases will be for immersive applications that do not require frequent, precise control, like entering text. These applications would mostly track a user’s hands, and increasingly their eyes and bodies, as input. Games can also access inputs from game controllers or steering wheels. Because VR users who are moving around risk bumping into real-life objects or people, VR experiences are more fit for dedicated spaces rather than communal settings. Headsets and positional tracking devices can model the physical spaces in which users don headsets and even track their body movements.
      </p>
      <p className="three_content-paragraph">Dummy data for the paragraph text goes here. Add more details as needed.</p>

      {/* Video Container */}
      <div className="three_video-container">
        <video className="three_video-element" controls controlsList="nodownload">
          <source src="/Energex_ Pioneering Sustainable Energy Solutions Copy.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="three_divider-line"></div> {/* Bottom divider line */}
    </div>
  );
};

export default ModelThreeComponent;
