import React from "react";
import { useEffect, useState, useContext } from "react";
import "./OrderHistory.css";
import { AuthContext } from "../../context/AuthContext";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

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

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div className="OrderHistory">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {/* Customize based on your order fields */}
              <p>Order ID: {order.id}</p>
              <p>Items: {order.items?.join(", ")}</p>
              <p>Date: {order.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
