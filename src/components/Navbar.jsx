import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar.css";
import { Navmenuitems } from "./Navmenuitems";
import { useAuth } from "../AuthContext";

const Navbar = () => {
<<<<<<< HEAD
    const [clicked, setClicked] = useState(false);
    const { isLoggedIn, logout, user } = useAuth();
    const navigate = useNavigate();
=======
  const [clicked, setClicked] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
>>>>>>> bc2349631421e08c1e0413be7599c90e3f2f2be5

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

<<<<<<< HEAD
    return (
        <nav className="NavbarItems">
            <div className="navbar-logo-container">
                <h1 className="navbar-logo">OARS</h1>
                {isLoggedIn && user && (
                    <span className="user-name">Welcome, {user.name}</span>
                )}
            </div>
            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
=======
  return (
    <nav className="NavbarItems">
      {/* Scroll to the Outdoor Activities & Recreational Society section when clicking the OARS logo */}
      <Link to="#outdoor-activities-section" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 className="navbar-logo">OARS</h1>
      </Link>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
>>>>>>> bc2349631421e08c1e0413be7599c90e3f2f2be5

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {Navmenuitems.map((item, index) => {
          if (item.title !== "") {
            return (
              <li key={index}>
                <Link to={item.url} className={item.cName}>
                  <i className={item.icon}></i>
                  {item.title}
                </Link>
              </li>
            );
          }
          return null;
        })}
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className="nav-links">
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/signup" className="nav-links-green">
              <i className="fas fa-user-plus"></i>
              Signup/Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
