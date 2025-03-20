import React from "react";
import "./Products.css";
import products from "../../data/product.js";

const Products = () => {
  return (
    <div className="products">
      <h1>Our Quilling Frames</h1>
      <div className="product-items">
        {products.map((item, index) => (
          <div key={index} className="product-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <button>view details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
