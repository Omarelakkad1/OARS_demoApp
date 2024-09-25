import "./SupportStyles.css";

function SupportData(props) {
  return (
    <div className="s-card">
      <div className="s-image">
        <img src={props.image} alt="SupportUs" />
      </div>

      <h4>{props.heading}</h4>
      <p>{props.text}</p>
    </div>
  );
}

export default SupportData; 