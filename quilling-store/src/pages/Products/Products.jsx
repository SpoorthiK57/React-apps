import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import products from "../../data/product"; // your product array
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";

// Read category from URL
const useQuery = () => new URLSearchParams(useLocation().search);

const Products = () => {
  const query = useQuery();
  const category = query.get("category");
  const navigate = useNavigate();

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : [];

  const handleView = (selectedCategory) => {
    navigate(`/products?category=${encodeURIComponent(selectedCategory)}`);
  };

  return (
    <div className="products">
      <h1>{category ? category : "Our Collections"}</h1>

      {!category ? (
        // Show category cards if no category selected
        <div className="category-grid">
          <div
            className="category-card"
            onClick={() => handleView("Quilling Frames")}
          >
            <img src="/assets/image1.jpg" alt="Quilling Frames" />
            <div className="overlay">
              <h2>Greeting cards</h2>
              <button>VIEW</button>
            </div>
          </div>

          <div
            className="category-card"
            onClick={() => handleView("Greeting Cards")}
          >
            <img src="/assets/image1.jpg" alt="Greeting Cards" />
            <div className="overlay">
              <h2>Quilling Frames</h2>
              <button>VIEW</button>
            </div>
          </div>
        </div>
      ) : (
        // Show filtered products
        <div className="product-items">
          {filteredProducts.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
