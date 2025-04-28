import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./CheckOut.css";

const CheckOut = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (
      !email ||
      !fullName ||
      !address ||
      !city ||
      !stateName ||
      !zip ||
      !country ||
      !cardNumber ||
      !expiry ||
      !cvv
    ) {
      alert("Please fill all required fields before placing the order!");
      return;
    }

    // Clear cart
    setCart([]);

    // Redirect to Thank You page
    navigate("/thankyou");
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Contact Information */}
      <section className="checkout-section">
        <h2>Contact Information</h2>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </section>

      {/* Shipping Address */}
      <section className="checkout-section">
        <h2>Shipping Address</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Street Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </section>

      {/* Payment Information */}
      <section className="checkout-section">
        <h2>Payment Method</h2>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
      </section>

      {/* Order Summary */}
      <section className="checkout-section order-summary">
        <h2>Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="order-item">
              <div className="item-info">
                <span>{item.name}</span> × <span>{item.quantity}</span>
              </div>
              <div className="item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        )}

        <div className="order-totals">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>
            Shipping: <strong>FREE</strong>
          </p>
          <h3>Total: ${subtotal.toFixed(2)}</h3>
        </div>
      </section>

      {/* Place Order Button */}
      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default CheckOut;
