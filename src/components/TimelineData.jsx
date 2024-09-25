import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const TimelineData = (props) => {
  return (
    <div className={props.className}>
      <div className="time-text">
        <h2>{props.heading}</h2>
        <p>{props.text}</p>
      </div>
      <div className="image">
        <img alt="img" src={props.img1} data-aos="zoom-in" />
        <img alt="img" src={props.img2} data-aos="zoom-in" data-aos-delay="500" />
      </div>
    </div>
  );
};

export default TimelineData;
