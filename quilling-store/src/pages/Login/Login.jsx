import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { setAuthToken } from "../../helpers/auth";
import "./Login.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { setToken, setCurrentUser } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setChecked(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save token to localStorage
        setAuthToken(data.token);
        setToken(data.token); // update context
        const decoded = jwtDecode(data.token);
        setCurrentUser(decoded);
        localStorage.setItem("currentUser", JSON.stringify(decoded));

        // Save email if Remember Me is checked
        if (checked) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        alert("Login successful!");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Try again.");
    }
  };

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
          id="remember"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="remember">Remember me</label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
