import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api';
import { useAuth } from '../AuthContext';
import "../Login.css";
import commuiteRecruitment from "../assets/commuiteRecruitment.jpg";
import fitnessNightImage from "../assets/FitnessNightImage.jpg";
import memberShip from "../assets/MemberShip.jpg";
import wallpaperFlare from "../assets/wallpaperflare.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const images = [
    commuiteRecruitment,
    fitnessNightImage,
    memberShip,
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

  const backgroundStyle = {
    backgroundImage: `url(${wallpaperFlare})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div className="container">
        <div className="row border rounded-5 p-1 bg-white shadow box-area" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <div className="image-carousel" style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', borderRadius: '15px' }}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Featured ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${(index - currentImageIndex) * 100}%`,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'left 0.5s ease-in-out',
                    borderRadius: '15px',
                  }}
                />
              ))}
              <div className="dots-container" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                {images.map((_, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: currentImageIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                      margin: '0 5px',
                      cursor: 'pointer',
                    }}
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
                <div className="input-group mb-3">
                  <label htmlFor="email" className="visually-hidden">Email address</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg bg-light fs-6" 
                    id="email"
                    placeholder="Email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-2">
                  <label htmlFor="password" className="visually-hidden">Password</label>
                  <input 
                    type="password" 
                    className="form-control form-control-lg bg-light fs-6" 
                    id="password"
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3 d-flex justify-content-between">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="formCheck" />
                    <label htmlFor="formCheck" className="form-check-label text-secondary">
                      <small>Remember Me</small>
                    </label>
                  </div>
                  <div className="forgot">
                    <small><Link to="/forgot-password">Forget Password?</Link></small>
                  </div>
                </div>
                <div className="input-group mb-4">
                  <button type="submit" className="btn btn-lg btn-success w-100 fs-6">Login</button>
                </div>
              </form>
              <div className="row mb-4">
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
