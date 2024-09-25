import React, { useEffect } from "react";
import River2 from "../assets/River2.jpg";
import kayak from "../assets/kayak.jpg";
import kayak2 from "../assets/kayak2.jpg";
import wallclimb from "../assets/wallclimb.png";
import wallclimb2 from "../assets/wallclimb2.png";
import pulau from "../assets/pulau.jpg";
import pulau2 from "../assets/pulau2.png";
import caving from "../assets/caving.png";
import gua from "../assets/gua.png";
import gua2 from "../assets/gua2.png";
import hiking from "../assets/hiking.png";
import hiking2 from "../assets/hiking2.jpg";
import aid from "../assets/aid.png";
import aid2 from "../assets/aid2.png";

import TimelineData from "./TimelineData";
import "./TimelineStyles.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles


const Timeline = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="timeline">
      <h1>Roadmap of the OARS club</h1>
      <p>
        Here is the timeline of what the OARS club have gone through from the current present to the past
      </p>

      <TimelineData
        className="first-time"
        heading="14th September 2024 : Kayak Expedition"
        text="On the 14th Sept 2024 | Jeti Pak Din, Sungai Pelek, Bagan Lalang. The OARS and swimming club hosted a successful expedition with 38 amazing participants paddling
         through the stunning mangroves in celebration of Merdeka. The Malaysian flag was proudly part of the journey as we embraced the beauty of our natural heritage. A big
          thank you to the MMU swimming club for the awesome collaboration!"
        img1={kayak}
        img2={kayak2}
      />
      <TimelineData
        className="first-time-reverse"
        heading="17th August 2024 : Wall Climbing"
        text="Putrajaya Challenge Park, Wall Climbing 2024. Another successful climb in the books! On August 17th, over 40 MMU students joined us for an exciting wall
         climbing event, one of the core activities at OARS. We're thrilled with the positive outcome and can't wait to see you at the next adventure!"
        img1={wallclimb2}
        img2={wallclimb}
      />
      <TimelineData
        className="first-time"
        heading="7th - 10th August 2024 : Pulau Perhentian"
        text="Panggilan Pulau : Perhentian , Terenganu. We're thrilled to share highlights from our recent leisure event at the breathtaking Pulau Perhentian, held from
         August 7th to 10th. Our 3D2N escapade was packed with unforgettable moments, starting with a hike up Windmill Pier for a mesmerizing view of Malaysia Beach. 
         We also dived into the vibrant underwater world, snorkeling among enchanting coral habitats and colorful fish! But that's not all! Our trip concluded with a
          spectacular fire show, lighting up the night sky and leaving us in awe."
        img1={pulau2}
        img2={pulau}
      />
      <TimelineData
        className="first-time-reverse"
        heading="22nd - 23rd July 2024 : River Glide"
        text="Our 2D1N adventure was packed with excitement, starting with a thrilling water rafting experience. Over 40 participants from MMU Cyberjaya and Melaka joined
         in, paddling together through a 5km stretch of river. The 3-hour journey was filled with rapids, teamwork, laughter, and a few splashes, making it a great bonding
          activity. On Day 2, we explored the stunning Gua Tempurung in Perak with 46 participants. The challenging caving expedition pushed us both mentally and physically, 
          but the breathtaking beauty and history of the cave made it all worth it. A big shoutout to the Melaka MMU students that joined us!"
        img1={caving}
        img2={River2}
      />
      <TimelineData
        className="first-time"
        heading="22nd June 2024 : Gua Damai Gripfest"
        text="Gua Damai Extreme Park, Batu Caves. On 22nd of June 2024, we had an Intro to rock climbing event in Gua Damai, Batu Caves. This event was joined by 36 
        participants in total including belayers and climbers. Everything went smoothly and the event was another successful event for OARS. We would like to thank everyone 
        who joined us. For those who would like to join our rock climbing event, do follow and stay tuned as we have more upcoming event coming soon."
        img1={gua}
        img2={gua2}
      />
      <TimelineData
        className="first-time-reverse"
        heading="26th May 2024 : Peak Pursuit"
        text="Our 2D1N adventure was packed with excitement, starting with a thrilling water rafting experience. Over 40 participants from MMU Cyberjaya and Melaka joined
         in, paddling together through a 5km stretch of river. The 3-hour journey was filled with rapids, teamwork, laughter, and a few splashes, making it a great bonding
          activity. On Day 2, we explored the stunning Gua Tempurung in Perak with 46 participants. The challenging caving expedition pushed us both mentally and physically, 
          but the breathtaking beauty and history of the cave made it all worth it. A big shoutout to the Melaka MMU students that joined us!"
        img1={hiking2}
        img2={hiking}
      />
      <TimelineData
        className="first-time"
        heading="11th - 12th May 2024 : Rapid Rescue"
        text="Gua Damai Extreme Park, Batu Caves. On 22nd of June 2024, we had an Intro to rock climbing event in Gua Damai, Batu Caves. This event was joined by 36 
        participants in total including belayers and climbers. Everything went smoothly and the event was another successful event for OARS. We would like to thank everyone 
        who joined us. For those who would like to join our rock climbing event, do follow and stay tuned as we have more upcoming event coming soon."
        img1={aid}
        img2={aid2}
      />
      <br/>
      <h1>And so much more! Come and join us!</h1>
    </div>
  );
};

export default Timeline;
