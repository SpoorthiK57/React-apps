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

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
