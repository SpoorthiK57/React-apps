import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import products from "../../data/product";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cart, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div>Product not found</div>;

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const cartItem = cart.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (cartItem) {
      // If item already in cart, update its quantity to selectedQuantity
      updateQuantity(cartItem.id, selectedQuantity);
    } else {
      // If item not in cart, add it
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: mainImage,
        },
        selectedQuantity
      );
    }
  };

  return (
    <div className="product-details-container">
      <div className="left-panel">
        <img className="main-image" src={mainImage} alt={product.name} />
        <div className="thumbnail-row">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              className={`thumbnail ${mainImage === img ? "selected" : ""}`}
              onClick={() => setMainImage(img)}
              alt={`Thumbnail ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="right-panel">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>
        <p className="price">Price : ${product.price.toFixed(2)}</p>

        {/* Quantity Selector */}
        {/* Row container for quantity + add-to-cart */}
        <div className="cart-row">
          {/* LEFT SIDE: Quantity + Remove */}
          <div className="left-cart">
            <div className="quantity-controls">
              <button
                onClick={() =>
                  setSelectedQuantity((prevQty) => Math.max(1, prevQty - 1))
                }
              >
                -
              </button>
              <span>{selectedQuantity}</span>
              <button
                onClick={() => setSelectedQuantity((prevQty) => prevQty + 1)}
              >
                +
              </button>
            </div>

            {/* Remove below quantity */}
            {cartItem && (
              <div className="remove-container">
                <button
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(product.id);
                    setSelectedQuantity(1);
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Add to Cart */}
          <button className="add-to-cart" onClick={handleAddToCart}>
            {cartItem ? "Update Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
