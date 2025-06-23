import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Account.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Account = () => {
  const { currentUser, setToken, setCurrentUser, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [loading, currentUser, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setToken(null);
    setCurrentUser(null);
    navigate("/login");
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log("Current user:", currentUser);

  return (
    <div className="account-page">
      <h2>Welcome, {currentUser.email}</h2>
      <ul>
        <li>
          <a href="/myaccount">My Account</a>
        </li>
        <li>
          <Link to="/orders">Order History</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Account;
