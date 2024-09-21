import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const DestinationData = (props) => {
  return (
    <div className={props.className}>
      <div className="des-text">
        <h2>{props.heading}</h2>
        <p>{props.text}</p>
      </div>
      <div className="image">
        <img alt="img" src={props.img1} data-aos="fade-up" />
        <img alt="img" src={props.img2} data-aos="fade-up" data-aos-delay="200" />
      </div>
    </div>
  );
};

export default DestinationData;
