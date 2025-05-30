import React, { useEffect, useState, useContext } from "react";
import "./OrderHistory.css";
import { AuthContext } from "../../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const OrderHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("email", "==", currentUser.email));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // stop loading in both success/fail
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
            <li key={order.id}>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                Items:{" "}
                {order.items?.map((item, index) => (
                  <span key={index}>
                    {item.name} x{item.quantity}
                    {index < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>

              <p>
                Date:{" "}
                {order.createdAt.toDate().toLocaleDateString("en-US", {
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
