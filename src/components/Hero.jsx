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
      <div className={props.cName}>
        <img
          alt="HeroImg"
          src={imgSrc}
          onError={handleImageError}
        />

        <div className="hero-text">
          <h1>{props.title}</h1>
          <p>{props.text}</p>
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
