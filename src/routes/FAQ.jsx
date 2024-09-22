import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQcomp from '../components/FAQcomp';
import AboutImg from '../assets/homePage.jpg';

function FAQ() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="FAQ"
        btnClass="hide"
      />
      <FAQcomp />
      <Footer />
    </>
  );
}

export default FAQ;