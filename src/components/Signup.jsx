import React from 'react';
import "../signup.css";
// import "../Login.css"
import { Link } from 'react-router-dom'; // Ensure this is imported

function Signup() {
  return (
    <div className="signup d-flex justify-content-center align-items-center">
      <div className="form_container p-5 ">
        <form >
          <h3 className="text-center">Sign Up</h3>
          <div className="mb-3">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              // placeholder="Enter First Name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              placeholder="Enter Last Name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control"
            />
          </div>
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          </div>
          <p className="text-end mt-2">
            Already Registered? <Link to="/" className="ms-2">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
