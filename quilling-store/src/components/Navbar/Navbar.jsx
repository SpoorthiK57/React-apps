import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import quilling_wonderland from "/assets/quilling wonderland.jpg";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="left">
        <img
          src={quilling_wonderland}
          alt="Quilling Wonderland"
          className="logo"
        />
        <h2>Paper Quills</h2>
      </div>

      {/* Hamburger menu for mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Navigation menu */}
      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <ul className="list" onClick={closeMenu}>
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
              to="/about"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Contact
            </NavLink>
          </li>
          {/* Mobile-only Cart & Login */}
          <li className="mobile-only">
            <NavLink to="/cart" className="cart-link" onClick={closeMenu}>
              <div className="cart">
                <img src="/assets/cart_log.png" className="cart-icon" />
                <span className="cart-count">{totalItems}</span>
              </div>
            </NavLink>
          </li>
          <li className="mobile-only">
            <NavLink to="/login" onClick={closeMenu}>
              <button className="login-button">Login</button>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Desktop-only Cart & Login */}
      <div className="right desktop-only">
        <div className="cart">
          <NavLink to="/cart">
            <img src="/assets/cart_log.png" className="cart-icon" />
            <span className="cart-count">{totalItems}</span>
          </NavLink>
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
