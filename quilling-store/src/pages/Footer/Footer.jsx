import React from "react";
import "./Footer.css";
import instagram from "../../../public/assets/instagram.png";
import facebook from "../../../public/assets/facebook.png";
import pinterest from "../../../public/assets/pinterest.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="description">
          <h3>Paper Quills</h3>
          <p>Short description should be included here.</p>
          <div className="social-media">
            <img src={instagram} alt="" />
            <img src={facebook} alt="" />
            <img src={pinterest} alt="" />
          </div>
        </div>
        <div className="quick-links">
          <h3>quick links</h3>
          <ul>
            <li>Home</li>
            <li>Our products</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>Shipping policy</li>
          </ul>
        </div>
        <div className="newsletter">
          <h3>Subscribe to our news letter</h3>
          <p>
            To stay updated with our latest collection, please enter your email
          </p>
          <input type="email" placeholder="" />
          <button>submit</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright@2025. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
