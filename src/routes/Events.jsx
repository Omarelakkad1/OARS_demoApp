import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutImg from '../assets/homePage.jpg';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import './Events.css';

function Events() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="Events"
        btnClass="hide"
      />
      <div className="events-container">
        <div className="events-section">
          <EventList />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Events;