import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/${orderId}`
        );
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading your order details...</p>;

  return (
    <div className="thank-you-page">
      <h2>Thank You for Your Purchase!</h2>
      <p>Your order has been placed successfully.</p>
      <p>A confirmation email has been sent to your inbox.</p>

      <h3 className="section-title">Order Summary</h3>

      {order.items.map((item, index) => (
        <div key={index} className="order-item">
          <img src={item.image} alt={item.name} className="order-item-image" />
          <div className="order-item-details">
            <strong>{item.name}</strong>
            <p className="product-subtext">× {item.quantity}</p>
          </div>
          <div className="order-item-price">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      <div className="payment-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${order.subtotal?.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>${order.shippingCost?.toFixed(2) || "0.00"}</span>
        </div>
        <div className="summary-row total-row">
          <strong>Total</strong>
          <strong>${order.total?.toFixed(2) || "0.00"}</strong>
        </div>
      </div>

      <div className="info-card">
        <h3>Contact Email</h3>
        <p>{order.email || "N/A"}</p>
      </div>

      <div className="info-card">
        <h3>Shipping Address</h3>
        <p>{order.shipping?.fullName || "N/A"}</p>
        <p>{order.shipping?.address || ""}</p>
        <p>
          {order.shipping?.city}, {order.shipping?.state} {order.shipping?.zip}
        </p>
        <p>{order.shipping?.country || ""}</p>
      </div>

      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
};

export default ThankYou;
