import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api';
import { useAuth } from '../AuthContext';
import "../Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const images = [
    "/images/commuiteRecruitment.jpg",
    "/images/FitnessNightImage.jpg",
    "/images/MemberShip.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control form-control-lg bg-light fs-6" 
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-1">
                <input 
                  type="password" 
                  className="form-control form-control-lg bg-light fs-6" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
                <button type="submit" className="btn btn-lg btn-success w-100 fs-6">Login</button>
              </div>
            </form>
            <div className="input-group mb-3">
              <button className="btn btn-lg btn-light w-100 fs-6">
                <img src="/images/google.png" style={{ width: "20px" }} className="me-2" alt="Google" />
                <small>Sign In with Google</small>
              </button>
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
