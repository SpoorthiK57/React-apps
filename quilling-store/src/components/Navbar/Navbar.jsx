import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import quilling_wonderland from "/assets/quilling wonderland.jpg";
import { useAuth } from "../../context/AuthContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

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

          {/* PRODUCTS WITH DROPDOWN */}
          <li className="dropdown">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Products
            </NavLink>
            <ul className="dropdown-menu">
              <li>
                <NavLink
                  to="/products?category=Greeting Cards"
                  className="dropdown-link"
                >
                  Greeting Cards
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products?category=Quilling Frames"
                  className="dropdown-link"
                >
                  Quilling Frames
                </NavLink>
              </li>
            </ul>
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

          <li className="mobile-only">
            <NavLink to="/cart" className="cart-link" onClick={closeMenu}>
              <div className="cart">
                <img src="/assets/cart_log.png" className="cart-icon" />
                <span className="cart-count">{totalItems}</span>
              </div>
            </NavLink>
          </li>

          <li className="mobile-only">
            {currentUser ? (
              <>
                <span className="welcome-text">
                  Welcome, {currentUser.email || "User"}
                </span>
                <button className="logout-button" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" onClick={closeMenu}>
                <button className="login-button">Login</button>
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      <div className="right desktop-only">
        <div className="cart">
          <NavLink to="/cart">
            <img src="/assets/cart_log.png" className="cart-icon" />
            <span className="cart-count">{totalItems}</span>
          </NavLink>
        </div>
        <div className="login">
          <li className="dropdown">
            <NavLink to={currentUser ? "/account" : "/login"}>
              <button className="login-button">Login</button>
            </NavLink>
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/myaccount" className="dropdown-link">
                  My Account
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders" className="dropdown-link">
                  Order History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
