import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./ThankYou.css";

const ThankYou = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  const [order, setOrder] = useState(null);
  const { cart } = useContext(CartContext); // Optional: pass data via state or store order summary elsewhere
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrder(docSnap.data());
      } else {
        console.error("No such order!");
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <p>Loading your order details...</p>;
  }

  return (
    <div className="thank-you-page">
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been placed successfully.</p>
      <p>A confirmation email has been sent to your inbox.</p>

      <h3>Order Summary</h3>
      {order.items.length === 0 ? (
        <p>No items to show.</p>
      ) : (
        order.items.map((item, index) => (
          <div key={index} className="order-item">
            <img
              src={item.image}
              alt={item.name}
              className="order-item-image"
            />

            <div>
              <strong>{item.name}</strong> × {item.quantity}
            </div>

            <div>${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))
      )}

      <h3>Total Paid: ${order.total.toFixed(2)}</h3>
      <div className="contact-email">
        <h3>Contact Email</h3>
        <p>{order.email}</p>
      </div>

      <div className="shipping-details">
        <h3>Shipping Address</h3>
        <p>{order.shipping.fullName}</p>
        <p>{order.shipping.address}</p>
        <p>
          {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
        </p>
        <p>{order.shipping.country}</p>
      </div>

      <button onClick={() => (window.location.href = "/")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default ThankYou;
