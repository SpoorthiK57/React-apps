import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./pages/Footer/Footer";
import Products from "./pages/Products/Products";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
