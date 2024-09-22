import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup as apiSignup } from '../api';
import { useAuth } from '../AuthContext';
import "../signup.css";

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiSignup(firstName, lastName, email, phone);
      login(response.user, response.token);
      navigate('/'); // Redirect to home page after successful signup
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup d-flex justify-content-center align-items-center">
      <div className="form_container p-5">
        <form onSubmit={handleSignup}>
          <h3 className="text-center">Sign Up</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              className="form-control"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              className="form-control"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          </div>
          <p className="text-end mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
