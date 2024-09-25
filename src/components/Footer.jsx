import React from "react";
import { Link } from "react-router-dom";
import "./FooterStyles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="logo-section">
          <h1>OARS</h1>
          <p>Outdoor Activities and Recreational Society</p>
        </div>
        <div className="social-icons">
          <a href="https://m.facebook.com/groups/oarsmmucyber/">
            <i className="fa-brands fa-facebook-square"></i>
          </a>
          <a href="https://www.instagram.com/oarsmmucyber">
            <i className="fa-brands fa-instagram-square"></i>
          </a>
          <a href="https://t.me/oarsmmucyber">
            <i className="fa-brands fa-telegram"></i>
          </a>
          <a href="https://discord.com/invite/aQCVsUWYp3">
            <i className="fa-brands fa-discord"></i>
          </a>
        </div>
      </div>

      <div className="bottom">
        <div>
          <h4>Projects</h4>
          <Link to="/">Changelog</Link>
          <Link to="/roadmap">Roadmap</Link>
          <Link to="/">Community</Link>
          <Link to="/support">Support</Link>
        </div>
        <div>
          <h4>About Us</h4>
          <Link to="/about">Our Story</Link>
          <Link to="/">Team</Link>
          <Link to="/">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Follow Us</h4>
          <a href="https://m.facebook.com/groups/oarsmmucyber/">Facebook</a>
          <a href="https://www.instagram.com/oarsmmucyber">Instagram</a>
          <a href="https://t.me/oarsmmucyber">Telegram</a>
          <a href="https://discord.com/invite/aQCVsUWYp3">Discord</a>
        </div>
        <div>
          <h4>Legal</h4>
          {/* Link to the Policies page with anchor links */}
          <Link to="/policies#privacy-policy">Privacy Policy</Link>
          <Link to="/policies#terms-of-service">Terms of Service</Link>
          <Link to="/policies#cookies-policy">Cookies Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
