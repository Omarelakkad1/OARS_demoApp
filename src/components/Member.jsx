import React, { useState } from "react";
import "./MemberStyles.css";

function Member() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentProof: null,
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.paymentProof) newErrors.paymentProof = "Payment proof is required";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", formData);
      alert("Registration successful! We'll contact you soon.");
    }
  };

  return (
    <div className="Member-container">
      <h1>Register to be a member!</h1>
      <form onSubmit={handleSubmit}>
        <p>A payment of <b>RM5</b> is required</p>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <span className="error">{errors.name}</span>}
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

        <button type="submit">Register as a member</button>
      </form>
    </div>
  );
}

export default Member;
