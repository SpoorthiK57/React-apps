const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  email: String,
  shipping: {
    fullName: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  items: [
    {
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    default: "Pending", // other values: Shipped, Delivered, etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
