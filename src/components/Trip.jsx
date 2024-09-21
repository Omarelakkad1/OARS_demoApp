import "./TripStyles.css";
import TripData from "./TripData"; // Make sure the name matches
import climb1 from "../assets/climb1.jpg"; // Uncomment this import

function Trip() {
  return (
    <div className="trip">
      <h1>Recent Trips</h1>
      <p>You can discover unique destinations using Google Maps.</p>
      <div className="tripcard">
        <TripData
          image={climb1}
          heading="Wall Climbing Adventure"
          text="Discover the thrill of wall climbing with breathtaking views."
        />


<TripData
          image={climb1}
          heading="Wall Climbing Adventure"
          text="Discover the thrill of wall climbing with breathtaking views."
        />


<TripData
          image={climb1}
          heading="Wall Climbing Adventure"
          text="Discover the thrill of wall climbing with breathtaking views."
        />
        
      </div>
    </div>
  );
}

export default Trip;
