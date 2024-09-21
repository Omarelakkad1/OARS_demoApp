import "./MemberStyles.css";

function Member() {
  return (
    <div className="Member-container">
      <h1>Register to be a member!</h1>
      <form>
        <p>A payment of <b>RM5</b> is required</p>
        <input type="file" id="paymentProof" name="paymentProof" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => {
          if (e.target.files.length === 0) {
            document.getElementById("fileMessage").textContent = "Please submit a file";
            document.getElementById("fileMessage").style.color = "red";
            document.getElementById("registerButton").disabled = true;
          } else {
            document.getElementById("fileMessage").textContent = "Thank you! Your file has been chosen";
            document.getElementById("fileMessage").style.color = "green";
            document.getElementById("registerButton").disabled = false;
          }
        }} />
        <label htmlFor="paymentProof">Attach proof of payment</label>
        <div id="fileMessage" style={{color: "red"}}>Please submit a file</div>
        <button id="registerButton" type="submit" disabled>Register as a member</button>
      </form>
    </div>
  );
}

export default Member;
