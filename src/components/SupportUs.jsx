import "./SupportStyles.css";
import SupportData from "./SupportData"; // Make sure the name matches
import tshirt from "../assets/tshirt.jpg";
import towel from "../assets/towel.jpeg";

function SupportUs() {
  return (
    <div className="support">
      <h1>OARS Merchandise</h1>
      <p>Support us by buying these exclusive merchandise!</p>
      <div className="supportcard">
        <SupportData
          image={towel}
          heading="OARS stands in solidarity with Palestine!"
          text="We stand with the Palestinian people in their daily struggles and believe in peace, justice, and human rights for all. Everyone deserves to live in a fair and peaceful
           world. To show our support, we are selling high-quality towerls, with 100% of profits going to the Islamic Relief Malaysia | Palestine Appeal. Your purchase can help
            make a difference for Palestine. Order now by scanning the QR code."
        />

        <SupportData
          image={tshirt}
          heading="Open Pre-order Official 2024 OARS T-SHIRT"
          text="Hello Everyone! We are excited to announce our new club t-shirt for the year of 2024. Anyone is welcome to purchase this whether they are a OARS member or not.
           Each t-shirt will cost RM35 per piece regardless of size. This t-shirt features Microfibre Materials as well as making you feel cool and comfortable. Our t-shirts
            comes in sizes from S until 2XL"
        />
      </div>
    </div>
  );
}

  export default SupportUs;