import React, { useState, useEffect, useContext } from "react";
import "./MemberStyles.css";
import { registerMember, checkMemberStatus } from '../api';
import { AuthContext } from '../AuthContext';

function Member({ setParentIsRegistered }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentProof: null,
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const checkStatus = async () => {
      if (user && user.email) {
        try {
          const status = await checkMemberStatus(user.email);
          setIsRegistered(status);
          if (setParentIsRegistered) {
            setParentIsRegistered(status);
          }
        } catch (error) {
          console.error("Error checking member status:", error);
        }
      }
    };
    checkStatus();
  }, [user, setParentIsRegistered]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.paymentProof) newErrors.paymentProof = "Payment proof is required";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      try {
        const response = await registerMember({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        });
        setSubmitMessage("Registration successful! We'll contact you soon.");
        setIsRegistered(true);
        if (setParentIsRegistered) {
          setParentIsRegistered(true);
        }
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          paymentProof: null,
          agreeTerms: false
        });
      } catch (error) {
        setSubmitMessage("Registration failed. Please try again later.");
      }
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="Member-container">
        <h1>Become a Member</h1>
        <p>Please log in to register as a member or check your membership status.</p>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="Member-container">
        <h1>Welcome, Member!</h1>
        <p>You are already registered as a member. Enjoy your benefits!</p>
      </div>
    );
  }

  return (
    <div className="Member-container">
      <h1>Register to be a member!</h1>
      <form onSubmit={handleSubmit}>
        <p>A payment of <b>RM5</b> is required</p>
        
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            aria-invalid={errors.firstName ? "true" : "false"}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            aria-invalid={errors.lastName ? "true" : "false"}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <input
            type="file"
            id="paymentProof"
            name="paymentProof"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleInputChange}
            aria-invalid={errors.paymentProof ? "true" : "false"}
            style={{display: 'none'}}
          />
          <label htmlFor="paymentProof" className="file-upload-label">
            {formData.paymentProof ? formData.paymentProof.name : "Attach proof of payment"}
          </label>
          {errors.paymentProof && <span className="error">{errors.paymentProof}</span>}
        </div>

        <div className="form-group checkbox">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              aria-invalid={errors.agreeTerms ? "true" : "false"}
            />
            <label htmlFor="agreeTerms">
              I agree to the&nbsp;<a href="#" className="terms-link">terms and conditions</a>
            </label>
          </div>
          {errors.agreeTerms && <span className="error">{errors.agreeTerms}</span>}
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Registering..." : "Register as a member"}
        </button>

        {submitMessage && <div className="submit-message">{submitMessage}</div>}
      </form>
    </div>
  );
}

export default Member;
