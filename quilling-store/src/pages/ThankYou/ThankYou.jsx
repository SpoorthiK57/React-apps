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
      if (!orderId) {
        console.error("No order ID provided.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/${orderId}`
        );
        if (!response.ok) throw new Error("Failed to fetch order");

        const data = await response.json();
        console.log("Fetched order:", data);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <p>Loading your order details...</p>;
  }

  return (
    <div className="thank-you-page">
      <h2>Thank You for Your Purchase!</h2>
      <p>Your order has been placed successfully.</p>
      <p>A confirmation email has been sent to your inbox.</p>

      <h3>Order Summary</h3>
      {!order.items || order.items.length === 0 ? (
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

      <h3>Total Paid: ${order.total?.toFixed(2) || "0.00"}</h3>

      <div className="contact-email">
        <h3>Contact Email</h3>
        <p>{order.email || "N/A"}</p>
      </div>

      <div className="shipping-details">
        <h3>Shipping Address</h3>
        <p>{order.shipping?.fullName || "N/A"}</p>
        <p>{order.shipping?.address || "N/A"}</p>
        <p>
          {order.shipping?.city}, {order.shipping?.state} {order.shipping?.zip}
        </p>
        <p>{order.shipping?.country || "N/A"}</p>
      </div>

      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
};

export default ThankYou;
