import React, { useContext } from "react";
import products from "../../data/product";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { CartContext } from "../../context/CartContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));
  if (!product) {
    return <div>Product not found</div>;
  }
  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      1
    );
  };

  return (
    <div className="product-details">
      <img src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${parseFloat(product.price).toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>{" "}
    </div>
  );
};

export default ProductDetails;
