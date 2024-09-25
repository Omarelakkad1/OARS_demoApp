import React from "react";
import "./AboutUsStyles.css";
import ukasyahImage from "../assets/ukasyah.jpeg";
import choon from "../assets/lcw.jpeg";
import omar from "../assets/omar.jpeg";
import firdaus from "../assets/firdaus.jpeg";

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>Our History</h1>
        <p>
          Since its establishment in 2000, the Outdoor Activities & Recreational
          Society (OARS) at MMU Cyberjaya has been a vibrant part of campus life,
          promoting adventure, camaraderie, and personal growth. What started with
          a group of students passionate about the outdoors has evolved into a
          club known for organizing memorable adventures like hiking, kayaking,
          and camping. OARS fosters a sense of community, welcoming both
          experienced adventurers and newcomers alike. Over the years, the club
          has left a lasting legacy, shaping the experiences and friendships of
          MMU students for generations to come.
        </p>
        <h1>Our Vision</h1>
        <p>
          At OARS MMU Cyberjaya, the motto "Born to be Tough, Trained to be Rough"
          embodies the spirit of adventure, resilience, and personal growth that
          the club stands for. OARS envisions empowering students to step beyond
          their comfort zones, building confidence through challenges like treks
          and team-building exercises. The club seeks to ignite a love for nature
          by offering students firsthand experiences of Malaysia's beautiful
          landscapes. Committed to sustainable practices, OARS also emphasizes
          environmental awareness and eco-friendly adventures. Additionally, OARS
          aspires to create lasting bonds, fostering a global network of
          adventurers united by shared experiences. Whether on campus or as
          alumni, OARS members carry forward the values of camaraderie and respect
          for the natural world. #PowerToTheOARS!
        </p>
      </div>
      <div className="team-section">
        <h1>Meet Our Team</h1>
        <div className="team-members">
          <div className="team-member">
            <img src={ukasyahImage} alt="Ukasyah" className="team-member-image" />
            <h3>Muhammad Ukasyah</h3>
            <p>Student ID : 1221303909 <br/> Section : TC1L <br/> <a href="mailto:1221303909@student.mmu.edu.my">Contact Me</a> </p>
            
          </div>
        <div className="team-member">
          <img src={choon} alt="Wang Choon Hoe" className="team-member-image" />
          <h3>Wang Choon Hoe</h3>
          <p>Student ID: 119110335 <br/> Section : TC1L <br/> <a href="mailto:119110335@student.mmu.edu.my">Contact Me</a></p>
        </div>
        <div className="team-member">
          <img src={omar} alt="Omar Elakkad" className="team-member-image" />
          <h3>Omar Elakkad</h3>
          <p>Student ID: 1211300682 <br/> Section : TC1L <br/> <a href="mailto:1211300682@student.mmu.edu.my">Contact Me</a></p>
        </div>
        <div className="team-member">
          <img src={firdaus} alt="Firdaus Azman" className="team-member-image" />
          <h3>Firdaus Azman</h3>
          <p>Student ID: 1191101797 <br/> Section : TC1L <br/> <a href="mailto:1191101797@student.mmu.edu.my">Contact Me</a></p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
