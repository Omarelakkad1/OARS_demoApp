import React, { useEffect } from "react";
import climb1 from "../assets/climb1.jpg"; // Adjust the path to match your file structure
import climb2 from "../assets/climb2.jpg";
import River from "../assets/River.jpg"; // Adjust the path to match your file structure
import River2 from "../assets/River2.jpg";

import DestinationData from "./DestinationData";
import "../DestinationStyles.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const Destination = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="destination">
      <h1>#PowerToTheOARS</h1>
      <p>
        Oars give you the opportunity to explore new places and experiences.
      </p>

      <DestinationData
        className="first-des"
        heading="Wall Climbing"
        text="Ever reached new heights or conquered the summit? As the first event from OARS in 2024, join us for an Introduction To Wall Climbing at Putrajaya Challenge Park. Worry no more as we have qualified instructors for you to learn from the basics about wall climbing and even guide every step of yours, making everyone a climber!"
        img1={climb1}
        img2={climb2}
      />
      <DestinationData
        className="first-des-reverse"
        heading="River Glide"
        text="Water rafting trip covered all 5km stretch of river and took us almost 3 hours to complete. We paddled through rapids, steered around obstacles, and worked together to keep our rafts on course. It was a thrilling ride filled with teamwork, laughter, and a few unexpected splashes. Everyone gave their best effort, and the friendship was truly inspiring. Successful rafting relies heavily on teamwork and communication, making it a great bonding activity. Stay tuned for more excitement and don’t forget to share your favorite moments with us in the comments below!"
        img1={River}
        img2={River2}
      />
    </div>
  );
};

export default Destination;
