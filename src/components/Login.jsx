import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../Login.css"; 

function Login() {
  const images = [
    "/images/commuiteRecruitment.jpg",
    "/images/FitnessNightImage.jpg",
    "/images/MemberShip.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="container">
      <div className="row border rounded-5 p-1 bg-white shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
          <div className="image-container">
            <img src={images[currentImageIndex]} alt="Featured" />
            <div className="dots-container">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentImageIndex === index ? "active" : ""}`}
                  onClick={() => goToImage(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>OARS</h2>
              <p>We are happy to have you back.</p>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" />
            </div>
            <div className="input-group mb-1">
              <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" />
            </div>
            <div className="input-group mb-5 d-flex justify-content-between">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="formCheck" />
                <label htmlFor="formCheck" className="form-check-label text-secondary">
                  <small>Remember Me</small>
                </label>
              </div>
              <div className="forgot">
                <small><a href="#">Forgot Password?</a></small>
              </div>
            </div>
            <div className="input-group mb-3">
              <button className="btn btn-lg btn-success w-100 fs-6">Login</button>
            </div>
            <div className="row">
              <small>Don't have an account? <Link to="/signup">Sign Up</Link></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
