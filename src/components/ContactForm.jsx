import React, { useState } from "react";
import "./ContactStyles.css";
import { submitFeedback } from "../api";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting feedback:", formData);
      const response = await submitFeedback(formData);
      console.log("API response:", response);
      if (response && response.message) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", title: "", description: "" });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting feedback:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
    }
  };

  return (
    <div className="from-container">
      <h1>Send a message to us!</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="title"
          placeholder="Subject"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Message"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      {submitStatus === "success" && (
        <p className="success-message">Thank you for your feedback!</p>
      )}
      {submitStatus === "error" && (
        <p className="error-message">
          There was an error submitting your feedback. Please try again.
        </p>
      )}
    </div>
  );
}

export default ContactForm;
