import React, { useState } from "react";
import "./CartProvider.css";
import { CartContext } from "../../context/CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeCartItem = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeCartItem, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
