import React, { useEffect, useState, useContext } from "react";
import "./OrderHistory.css";
import { AuthContext } from "../../context/AuthContext";

const OrderHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      console.log("Current User in OrderHistory:", currentUser);

      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/user/${currentUser.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div className="OrderHistory">
      <h2>Order History</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="order-card">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>

              <div className="order-items">
                {order.items?.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div>
                      <p>
                        <strong>{item.name}</strong> × {item.quantity}
                      </p>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>
              <p>
                <strong>Status:</strong> {order.status || "Confirmed"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
