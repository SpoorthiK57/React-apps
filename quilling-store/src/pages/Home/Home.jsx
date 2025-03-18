import React from "react";
import "./Home.css";
import banner from "../../assets/banner.png";
import story_image from "../../assets/story_bg.png";
import image1 from "../../assets/image1.jpg";

const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <img src={banner} alt="" className="banner" />
        <div className="welcome">
          <h2>Welcome to Paper Quills - Handmade Quilling Wonders!</h2>
        </div>
        <div className="shop-button">
          <button className="shop">Shop our products</button>
        </div>
      </div>
      <div className="new-arrivals">
        <div className="arrival-item1">
          <img src={image1} alt="" />
          <p>Blue Tortoise</p>
          <button>view details</button>
        </div>
        <div className="arrival-item2">
          <img src={image1} alt="" />
          <p>Blue Tortoise</p>
          <button>view details</button>
        </div>
      </div>
      <div className="story">
        <img src={story_image} alt="" className="bg-img" />
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
      </div>
    </div>
  );
};

export default Home;
