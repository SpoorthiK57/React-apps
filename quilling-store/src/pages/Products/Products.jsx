import React from "react";
import "./Products.css";
import products from "../../data/product.js";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";

const Products = () => {
  return (
    <div className="products">
      <h1>Our Quilling Frames</h1>
      <div className="product-items">
        {products.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
