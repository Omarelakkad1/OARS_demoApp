import React from "react";
import Footer from "../components/Footer";
import "./Policies.css";
import Navbar from "../components/Navbar";

const Policies = () => {
  return (
    <>
    <Navbar />
    <div className="policies-container">
    
      <section className="policy-section" id="privacy-policy">
        {" "}
        {/* Added id */}
        <h2>Privacy Policy</h2>
        <p>
          At OARS MMU Cyberjaya, we value your privacy and are committed to
          protecting your personal information. This policy outlines how we
          collect, use, and safeguard your data.
        </p>
        <h3>Information We Collect</h3>
        <ul>
          <li>
            <strong>Personal Information:</strong> Name, email, contact details
            when you sign up for events or services.
          </li>
          <li>
            <strong>Non-personal Information:</strong> Browsing behavior on our
            website for improving services.
          </li>
        </ul>
      </section>

      <section className="policy-section" id="terms-of-service">
        {" "}
        {/* Added id */}
        <h2>Terms of Service</h2>
        <p>
          By participating in OARS MMU Cyberjaya activities, you agree to these
          terms:
        </p>
        <ul>
          <li>
            <strong>Eligibility:</strong> All MMU students can join OARS events.
          </li>
          <li>
            <strong>Safety:</strong> Participants must follow safety rules
            during adventures.
          </li>
          <li>
            <strong>Behavior:</strong> Respectful collaboration and safety are
            essential.
          </li>
        </ul>
      </section>

      <section className="policy-section" id="cookies-policy">
        {" "}
        {/* Added id */}
        <h2>Cookies Policy</h2>
        <p>
          We use cookies to improve your experience on our website. Cookies help
          us understand your preferences and website usage.
        </p>
        <h3>Types of Cookies We Use</h3>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Necessary for the website's
            functionality.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us improve website
            performance.
          </li>
        </ul>
      </section>

      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>
          At OARS MMU Cyberjaya, we empower students to challenge themselves,
          explore nature, and build lifelong skills. Our motto, "Born to be
          Tough, Trained to be Rough," represents our belief in resilience,
          adventure, and personal growth.
        </p>
      </section>
      
    </div>
    <Footer/>
    </>
    
  );
};

export default Policies;
