import React, { useContext } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price });
  };

  return (
    <div className="product-card">
      <img src={product.image} alt="" className="product-img" />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <Link to={`/product/${product.id}`}>
        <button>View Details</button>
      </Link>
      <button onClick={handleAddToCart}>Add to Cart</button>{" "}
      {/* Add this button */}
    </div>
  );
};

export default ProductCard;
