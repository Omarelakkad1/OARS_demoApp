import "./TripStyles.css";
import TripData from "./TripData"; // Make sure the name matches
import gunung from "../assets/gunung.jpg";
import pulau from "../assets/pulau.jpg";
import kayak from "../assets/kayak.jpg";

function Trip() {
  return (
    <div className="trip">
      <h1>Recent Trips</h1>
      <p>You can discover unique destinations using Google Maps.</p>
      <div className="tripcard">
        <TripData
          image={pulau}
          heading="Pulau Perhentian"
          text="Our journey to Pulau Perhentian was filled with sun, sea, and the unstoppable energy of OARS! Snorkeling, sunbathing, and making memories that will last a lifetime
          Check out our video on Instagram and see the PowerToTheOARS in action!"
        />

        <TripData
          image={kayak}
          heading="Kayak Expedition"
          text="Join us for an exciting KAYAK EXPEDITION and explore the beauty of the mangroves. Don't miss out on this fun-filled day on the water!"
        />

        <TripData
          image={gunung}
          heading="Gunung Besar Hantu"
          text="EXPEDITION VOLUME 1: Gunung Besar Hantu ready for a real adventure? Join us on September 21-22 as we conquer Gunung Besar Hantu, the highest peak in Negeri Sembilan!
           Standing at 1462m, it promises a challenging and thrilling climb that will push your limits. Our journey will take us through scenic but rugged terrains,
            from narrow mountain passes to twisting roads that hug valleys and rivers."
        />
      </div>
    </div>
  );
}

export default Trip;
