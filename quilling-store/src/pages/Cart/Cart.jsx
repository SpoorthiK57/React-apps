import React, { useContext } from "react";
import "./Cart.css";
import { CartContext } from "../../context/CartContext";
import { Link, NavLink } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const calculateTotal = () =>
    cart
      .reduce((total, item) => {
        const price = parseFloat(item.price);
        return total + price * (item.quantity || 1);
      }, 0)
      .toFixed(2);

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Shopping cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-header-row">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="cart-item-row">
              <div className="item-details">
                <img src={item.image} alt={item.name} />
                <div>
                  <p className="product-name">{item.name}</p>
                  <p className="product-desc">{item.description}</p>
                </div>
              </div>

              {/* Price (desktop) */}
              <span className="price-value">
                ${parseFloat(item.price).toFixed(2)}
              </span>

              {/* Price (mobile) */}
              <div className="mobile-label">
                <span className="label-text">Price:</span>
                <span>${parseFloat(item.price).toFixed(2)}</span>
              </div>

              {/* Quantity Controls + Remove Button */}
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className={item.quantity <= 1 ? "disabled-btn" : ""}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              {/* Total (desktop) */}
              <span className="total-value">
                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
              </span>

              {/* Total (mobile) */}
              <div className="mobile-label">
                <span className="label-text">Total:</span>
                <span>
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          <div className="cart-footer">
            <div className="cart-actions">
              <Link to="/products">
                Continue shopping <span>&rarr;</span>
              </Link>
            </div>

            <div className="cart-subtotal">
              <h3>Subtotal</h3>
              <p className="subtotal-amount">${calculateTotal()}</p>
            </div>
            <div className="order-note">
              <label>ADD A NOTE TO YOUR ORDER</label>
              <textarea placeholder="Write your note here..."></textarea>
            </div>
            <p className="checkout-info">
              Taxes and <Link to="/shipping">shipping</Link> calculated at
              checkout
            </p>
            <NavLink to="/checkout">
              <button className="checkout-btn">Checkout</button>
            </NavLink>

            <div className="payment-options">
              <img src="/assets/shop_pay.png" alt="Shop Pay" />
              <img src="/assets/amazon_pay.png" alt="Amazon Pay" />
              <img src="/assets/paypal.png" alt="PayPal" />
              <img src="/assets/gpay.png" alt="Google Pay" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
