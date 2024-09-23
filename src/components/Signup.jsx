import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup as apiSignup } from '../api';
import { useAuth } from '../AuthContext';
import "../Signup.css";

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const images = [
    "/images/commuiteRecruitment.jpg",
    "/images/FitnessNightImage.jpg",
    "/images/MemberShip.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiSignup(firstName, lastName, email, phone, password);
      if (response.status === "error") {
        setError(response.message || "Signup failed. Please try again.");
        return;
      }
      login(response.user, response.token);
      navigate('/');
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row border rounded-5 p-1 bg-white shadow-sm box-area">
        {/* Left side - Signup form */}
        <div className="col-md-6 col-sm-12 left-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Sign Up</h2>
              <p>Join our community now.</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSignup}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm bg-light fs-6"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm bg-light fs-6"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control form-control-sm bg-light fs-6"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="tel"
                  className="form-control form-control-sm bg-light fs-6"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control form-control-sm bg-light fs-6"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-4">
                <button type="submit" className="btn btn-success w-100 fs-6">Sign Up</button>
              </div>
            </form>
            <div className="row mb-4">
              <small>Already have an account? <Link to="/login">Login</Link></small>
            </div>
          </div>
        </div>

        {/* Right side - Image carousel */}
        <div className="col-md-6 col-sm-12 rounded-4 d-flex justify-content-center align-items-center flex-column right-box">
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
      </div>
    </div>
  );
}

export default Signup;
