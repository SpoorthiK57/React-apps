import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import quilling_wonderland from "/assets/quilling wonderland.jpg";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="left">
        <img src={quilling_wonderland} alt="" className="logo" />
        <h2>Paper Quills</h2>
      </div>
      <ul className="list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/About"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Contact"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="right">
        <div className="cart">
          <NavLink to="/cart">
            <img src="/assets/cart_log.png" className="cart-icon" />
          </NavLink>
          <span className="cart-count">{totalItems}</span>
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
