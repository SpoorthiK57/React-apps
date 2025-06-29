import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import products from "../../data/product";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const handleShopClick = () => {
    navigate("/Products");
  };
  const banner = "/assets/banner.png";
  const story_image = "/assets/story_bg.png";
  const image1 = "/assets/image1.jpg";

  const arrivals = products.slice(0, 4); // or any 4 you want

  return (
    <div className="home">
      <motion.div
        className="banner"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={banner} alt="" className="banner" />
        <motion.div
          className="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Welcome to Paper Quills - Handmade Quilling Wonders!</h2>
        </motion.div>
        <motion.div
          className="shop-button"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <button className="shop" onClick={handleShopClick}>
            Shop our products
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="new-arrivals"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>New Arrivals</h2>
        <div className="new-arrivals-items">
          {arrivals.map((item, index) => (
            <motion.div
              key={item.id}
              className="arrival-item"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img src={item.images[0]} alt={item.name} />
              <p>{item.name}</p>
              <button onClick={() => navigate(`/product/${item.id}`)}>
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="story"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2>The Art of Paper, The Beauty of Patience</h2>
        <p className="my-story">
          What makes quilling special is its simplicity—strips of paper, coiled
          and shaped with care, come together to create breathtaking designs.
          From elegant floral patterns to intricate portraits, every piece tells
          a unique story. It’s an art that embraces mindfulness, where each roll
          and fold requires a gentle touch and a keen eye. At Paper Quills, we
          celebrate the beauty of quilling by bringing handcrafted elegance to
          life. Whether you’re discovering this art for the first time or
          cherishing it as a longtime passion, our collection showcases the
          magic that can emerge from something as simple as paper. Join us in
          reviving an art form that connects the past with the present—one coil
          at a time.
        </p>
      </motion.div>
    </div>
  );
};

export default Home;
