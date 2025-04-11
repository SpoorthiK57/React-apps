import React, { Children, createContext, useContext } from "react";
import "./Cart.css";
import { CartContext } from "../../context/CartContext";
import { Link, NavLink } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calculate the total cost of the items in the cart
  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) =>
          total + parseFloat(item.price.replace("$", "")) * item.quantity,
        0
      )
      .toFixed(2);
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Start shopping!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <p>{item.name}</p>
                <p>Price: {item.price}</p>

                {/* Quantity Control */}
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      item.quantity > 1
                        ? updateQuantity(item.id, item.quantity - 1)
                        : null
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Remove from Cart */}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          {/* Cart Total */}
          <div className="total">
            <h3>Total: ${calculateTotal()}</h3>
            <Link to="/checkout">
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
