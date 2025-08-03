import React from 'react';
import './Home.css';
const logo = process.env.PUBLIC_URL + "/assets/logo.png";


function Home({ onSOSClick }) {
  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="/assets/background.mp4" type="video/mp4" />
      </video>
      <div className="overlay">
        <img src={logo} alt="LifeSaver Logo" className="logo" />
        <h1 className="title">LifeSaver</h1>
        <button className="panic-button" onClick={onSOSClick}>SOS</button>
      </div>
    </div>
  );
}

export default Home;
