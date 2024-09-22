import React, { useState } from 'react';
import './FAQcomp.css';

const FAQcomp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What activities does OARS offer?",
      answer: "OARS offers a variety of outdoor activities including river rafting, kayaking, hiking, and camping trips."
    },
    {
      question: "Do I need prior experience to join OARS activities?",
      answer: "Most of our activities are suitable for beginners. We provide necessary training and equipment for each trip. However, some advanced trips may require prior experience."
    },
    {
      question: "How do I become a member of OARS?",
      answer: "You can become a member by visiting our Membership page and filling out the application form. Membership gives you access to exclusive trips and discounts."
    },
    {
      question: "What should I bring on a trip?",
      answer: "The required items vary depending on the trip. We provide a detailed packing list for each activity when you sign up. Generally, you'll need appropriate clothing, personal items, and any medication you require."
    },
    {
      question: "Are your activities safe?",
      answer: "Safety is our top priority. All our guides are certified and experienced. We provide safety equipment and briefings before each activity. However, outdoor activities always carry some inherent risks."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span className="faq-toggle">{activeIndex === index ? '-' : '+'}</span>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQcomp;