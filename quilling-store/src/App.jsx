import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./pages/Footer/Footer";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import ThankYou from "./pages/ThankYou/ThankYou";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RRwpzGao1hToinWVxX3YumAg0lmZ4WVE0Fc2GglzMD06kRymEpLgSkcUzpSXu1lZvV3MOmpemf7lrDK4Op0ljQD005Swq7gaq"
);

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <CheckOut />
            </Elements>
          }
        />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
