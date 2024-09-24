import React, { useState } from "react";
import "./HeroStyle.css";
import { Link } from 'react-router-dom';
import fallbackImage from '../assets/homePage.jpg';

function Hero(props) {
  const [imgSrc, setImgSrc] = useState(props.heroImg);

  const handleImageError = () => {
    console.error("Failed to load image:", props.heroImg);
    setImgSrc(fallbackImage);
  };

  return (
    <>
      {/* Add id for "Outdoor Activities & Recreational Society" section */}
      <div className={props.cName} id="outdoor-activities-section">
        <img
          alt="HeroImg"
          src={imgSrc}
          onError={handleImageError}
        />
        <div className="hero-text">
          <h1>{props.title}</h1>
          <p>{props.text}</p>
          <p><strong>Outdoor Activities & Recreational Society</strong></p> {/* The specific text */}
          {props.btnClass === "show" && (
            <Link to={props.url} className={`hero-btn ${props.btnClass}`}>
              {props.buttonText}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Hero;
