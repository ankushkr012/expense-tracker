import React from 'react';
import { FaChartLine, FaWallet, FaMobileAlt, FaUserPlus, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          <FaWallet className="hero-icon" /> Track Your Expenses Easily
        </h1>
        <p>
          <FaChartLine className="hero-icon" />
          Manage your spending with graphs, filters, and reports — all in one place.
        </p>
        <p>
          <FaMobileAlt className="hero-icon" />
          Accessible on all your devices.
        </p>
        <Link to="/register" className="cta-btn">
          <FaUserPlus /> Register
        </Link>
      </div>
    </section>
  );
};

export default Home;