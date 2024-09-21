import "./MemberStyles.css";

function Member() {
  return (
    <div className="Member-container">
      <h1>Register to be a member!</h1>
      <form>
        <p>A payment of 5 ringgit is required</p>
        <input type="file" id="paymentProof" name="paymentProof" accept=".pdf,.jpg,.jpeg,.png" />
        <label htmlFor="paymentProof">Attach proof of payment</label>
        <button type="submit">Register as a member</button>
      </form>
    </div>
  );
}

export default Member;
