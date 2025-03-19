import React, { useEffect, useState } from "react";
import "./Navbar.css";
import cart_logo from "../../assets/cart_log.png";
import quilling_wonderland from "../../assets/quilling wonderland.jpg";
import login_logo from "../../assets/login_logo.png";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="left">
        <img src={quilling_wonderland} alt="" className="logo" />
        <h2>Paper Quills</h2>
      </div>
      <ul className="list">
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" activeClassName="active">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/About" activeClassName="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/Contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="right">
        <div className="cart">
          <img src={cart_logo} alt="" className="cart-icon" />
          <NavLink to="/cart"></NavLink>
        </div>

        <div className="login">
          <NavLink to="/login">
            <button className="login-button">Login</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
