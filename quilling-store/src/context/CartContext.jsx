import React, { createContext, useState } from "react";

export const CartContext = createContext(null);
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // If product already exists, update the quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If product doesn't exist, add it to the cart
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to update item quantity
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, setCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
