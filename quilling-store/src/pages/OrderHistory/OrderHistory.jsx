import React from "react";
import { useEffect, useState, useContext } from "react";
import "./OrderHistory.css";
import { AuthContext } from "../../context/AuthContext";

const OrderHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setOrders([]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="OrderHistory">
      <h2>Order History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>Order #{order.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
