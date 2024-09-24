import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar.css";
import { Navmenuitems } from "./Navmenuitems";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

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

  return (
    <nav className="NavbarItems">
      <div className="navbar-logo-container">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className="navbar-logo">OARS</h1>
        </Link>
        {isLoggedIn && user && (
          <span className="user-name">Welcome, {user.name}</span>
        )}
      </div>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

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
