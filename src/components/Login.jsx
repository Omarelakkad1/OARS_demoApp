import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api';
import { useAuth } from '../AuthContext';
import "../Login.css";

// Import carousel images
import commuiteRecruitment from '../assets/commuiteRecruitment.jpg';
import FitnessNightImage from '../assets/FitnessNightImage.jpg';
import MemberShip from '../assets/MemberShip.jpg';
import backgroundImage from '../assets/wallpaperflare.jpg';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const images = [
    commuiteRecruitment,
    FitnessNightImage,
    MemberShip,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await apiLogin(email, password);
      login(response.user, response.token);
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div className="row box-area">
          <div className="col-md-6 d-flex justify-content-center align-items-center left-box">
            <div className="image-carousel">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Featured ${index + 1}`}
                  style={{
                    opacity: index === currentImageIndex ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                  }}
                />
              ))}
              <div className="dots-container">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
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
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input 
                    type="email" 
                    className="form-control form-control-lg bg-light fs-6" 
                    placeholder="Email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="password" 
                    className="form-control form-control-lg bg-light fs-6" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="formCheck" />
                    <label htmlFor="formCheck" className="form-check-label text-secondary">
                      <small>Remember Me</small>
                    </label>
                  </div>
                  <div className="forgot">
                    <small><Link to="/forgot-password">Forgot Password?</Link></small>
                  </div>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-lg btn-success w-100 fs-6">Login</button>
                </div>
              </form>
              <div className="text-center">
                <small>Don't have an account? <Link to="/signup">Sign Up</Link></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
