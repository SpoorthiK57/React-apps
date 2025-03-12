import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="" className="logo" />
      <ul className="list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
