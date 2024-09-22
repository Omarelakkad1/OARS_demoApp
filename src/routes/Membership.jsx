import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutImg from '../assets/homePage.jpg';
import Footer from '../components/Footer';
import Member from '../components/Member';
import { checkMemberStatus } from '../api';
import { AuthContext } from '../AuthContext';
import './Membership.css';

function Membership() {
  const [isRegistered, setIsRegistered] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const checkStatus = async () => {
      if (user && user.email) {
        try {
          const status = await checkMemberStatus(user.email);
          setIsRegistered(status);
        } catch (error) {
          console.error("Error checking member status:", error);
        }
      }
    };
    checkStatus();
  }, [user]);

  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="Membership"
      />
      <div className="membership-container">
        <div className="membership-section">
          <h2>Join Our Community</h2>
          {isLoggedIn ? (
            <Member setParentIsRegistered={setIsRegistered} />
          ) : (
            <div className="login-prompt">
              <p>Please log in to register as a member or check your membership status.</p>
              <Link to="/login" className="login-button">Log In</Link>
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Membership;