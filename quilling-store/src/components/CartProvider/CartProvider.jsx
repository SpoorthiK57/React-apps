import React, { useState } from "react";
import "./CartProvider.css";
import { CartContext } from "../../context/CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Increment quantity if product is already in cart
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Ensure price is a number and quantity is set
      const newProduct = {
        ...product,
        quantity: 1,
        price: Number(product.price) || 0,
      };
      setCart([...cart, newProduct]);
    }
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
