import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setMessage('Password reset link has been sent to your email.');
    }, 1500);
  };

  return (
    <div className="container">
      <div className="row border rounded-5 p-1 bg-white shadow-sm box-area">
        <div className="col-md-6 col-sm-12 left-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Forgot Password</h2>
              <p>Enter your email to reset your password.</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}
            <form onSubmit={handleSubmit}>
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
              <div className="input-group mb-4">
                <button type="submit" className="btn btn-success w-100 fs-6" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
            <div className="row mb-4">
              <small>Remember your password? <Link to="/login">Login</Link></small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-sm-12 rounded-4 d-flex justify-content-center align-items-center flex-column right-box">
          <div className="image-container">
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
