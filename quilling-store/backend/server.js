const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Stripe = require("stripe");

require("dotenv").config();

dotenv.config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Sample endpoint to create payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;


  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
