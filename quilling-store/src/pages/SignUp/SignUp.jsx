import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      console.log("user created:", user);
      setSuccess(true);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Try logging in instead.");
      } else {
        alert("Error creating account:" + error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      {success ? (
        <div className="success-message">
          <p>🎉 Account created successfully!</p>
          <p>
            <Link to="/login">Click here to login</Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="First Name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Create Account</button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}

      {!success && (
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      )}
    </div>
  );
};

export default SignUp;
