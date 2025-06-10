const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Save a new order
router.post("/", async (req, res) => {
  try {
    const { userId, email, items, total, shipping } = req.body;

    if (!userId || !email || !items || items.length === 0 || !total) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Failed to place order", details: err.message });
  }
});

// Get orders for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    if (!orders.length) {
      return res.status(404).json({ error: "No orders found for this user" });
    }

    res.json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

module.exports = router;
