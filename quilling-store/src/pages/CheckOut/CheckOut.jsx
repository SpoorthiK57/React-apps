import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./CheckOut.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

const CheckOut = () => {
  const { currentUser } = useContext(AuthContext);

  const stripe = useStripe();
  const elements = useElements();
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: subtotal * 100 }), // Convert dollars to cents
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment intent");
      }

      const clientSecret = data.clientSecret;
      console.log("Received client secret:", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: fullName,
            email: email,
            address: {
              line1: address,
              city: city,
              state: stateName,
              postal_code: zip,
              country: country,
            },
          },
        },
      });

      if (result.error) {
        console.error("Payment failed:", result.error.message);
        alert("Payment failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");

        // Save the order to Firestore
        await addDoc(collection(db, "orders"), {
          email: currentUser.email,
          userId: currentUser.uid,
          shipping: { fullName, address, city, state: stateName, zip, country },
          items: cart,
          total: subtotal,
          createdAt: Timestamp.now(),
        });

        alert("Payment successful!");
        setCart([]); // clear cart
        navigate("/thankyou"); // navigate to your ThankYou page
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
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
        <CardElement options={{ hidePostalCode: true }} />
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
