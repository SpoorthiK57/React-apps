import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "password") {
      if (checked) {
        localStorage.setItem("userEmail", email);
      }
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setChecked(true);
    }
  }, []);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <input
          type="checkbox"
          id="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.value)}
        />
        <label htmlFor="checkbox">Remember me</label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
