import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Destination from '../components/destination';
import Trip from '../components/trip';
import Footer from '../components/Footer';
import { useAuth } from '../AuthContext';
import { checkMemberStatus } from '../api';

function Home() {
  const { isLoggedIn, user } = useAuth();
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      if (isLoggedIn && user && user.email) {
        try {
          const status = await checkMemberStatus(user.email);
          setIsMember(status);
        } catch (error) {
          console.error("Error checking member status:", error);
        }
      }
    };
    checkStatus();
  }, [isLoggedIn, user]);

  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg="https://images.unsplash.com/photo-1570808303764-557b87f6a5a7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Outdoor Activities & Recreational Society"
        text="MMU Cyberjaya"
        buttonText="Become a Member"
        url="/membership"
        btnClass={isLoggedIn && !isMember ? "show" : "hide"}
      />
      <Destination />
      <Trip />
      <Footer/>
    </>
  );
}

export default Home;
