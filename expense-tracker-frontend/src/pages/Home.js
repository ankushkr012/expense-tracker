import React from "react";
import { FaChartPie, FaWallet, FaMobileAlt, FaLock, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero-text">
          <h1>Manage Your Expenses Eaisly With<span> Xpens</span></h1>
          <p>Track, analyze, and manage your expenses with ease.</p>
          <Link to="/register" className="hero-btn">
            <FaUserPlus /> Get Started
          </Link>
        </div>
        <div className="hero-img">
          <img         
 src="https://alp.consulting/wp-content/uploads/2024/10/Zoho-Expense-Implementation.webp"
            alt="Expense Tracker Illustration"
          />
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaWallet className="feature-icon" />
            <h3>Expense Tracking</h3>
            <p>Monitor your daily, weekly, and monthly spending effortlessly.</p>
          </div>
          <div className="feature-card">
            <FaChartPie className="feature-icon" />
            <h3>Smart Analytics</h3>
            <p>Visualize your finances with easy-to-understand graphs & charts.</p>
          </div>
          <div className="feature-card">
            <FaMobileAlt className="feature-icon" />
            <h3>Cross-Platform</h3>
            <p>Access your expense tracker anywhere, anytime, on any device.</p>
          </div>
          <div className="feature-card">
            <FaLock className="feature-icon" />
            <h3>Secure & Private</h3>
            <p>Your data is encrypted and fully protected for peace of mind.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;








