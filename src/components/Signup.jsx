import React from 'react';
import "../signup.css";
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="signup d-flex justify-content-center align-items-center">
      <div className="form_container p-5">
        <form>
          <h3 className="text-center">Sign Up</h3>
          <div className="mb-3">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              className="form-control"
              placeholder="Enter First Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              className="form-control"
              placeholder="Enter Last Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter Password"
            />
          </div>
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          </div>
          <p className="text-end mt-2">
            Login <Link to="/Login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
