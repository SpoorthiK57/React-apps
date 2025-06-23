import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && message) {
      try {
        const res = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        if (res.ok) {
          setSubmitted(true);
          setName("");
          setEmail("");
          setMessage("");
        } else {
          alert("Submission failed.");
        }
      } catch (err) {
        console.error(err);
        alert("Error sending message.");
      }
    }
  };

  return (
    <div className="contact-container">
      {submitted ? (
        <h2 className="success-message">
          Thank you! We'll get back to you soon.
        </h2>
      ) : (
        <>
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Contact;
