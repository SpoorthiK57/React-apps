import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (checked) {
        localStorage.setItem("rememberedEmail", email);
      }

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
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

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const getFirstName = (email) => {
    if (!email) return "User";
    const name = email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="login-container">
      {currentUser ? (
        <>
          <h2>Welcome, {getFirstName(currentUser.email)}</h2>
          <ul className="account-links">
            <li>
              <Link to="/account">My Account</Link>
            </li>
            <li>
              <Link to="/orders">Order History</Link>
            </li>
            <li onClick={handleLogout} className="logout-link">
              Logout
            </li>
          </ul>
        </>
      ) : (
        <>
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
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label htmlFor="checkbox">Remember me</label>
            <button type="submit">Login</button>
          </form>
          <p>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
