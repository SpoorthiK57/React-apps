import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./ThankYou.css";

const ThankYou = () => {
  const { cart } = useContext(CartContext); // Optional: pass data via state or store order summary elsewhere
  const navigate = useNavigate();

  return (
    <div className="thank-you-page">
      <h1>🎉 Thank You for Your Purchase!</h1>
      <p>Your order has been placed successfully.</p>
      <p>A confirmation email has been sent to your inbox.</p>

      <div className="order-summary">
        <h2>Order Summary</h2>
        {cart.length === 0 ? (
          <p>No items to show.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
};

export default ThankYou;
