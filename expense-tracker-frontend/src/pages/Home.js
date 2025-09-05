import React from "react";
import {  FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero-text">
          <h1>Take Control of Your <span>Finances</span></h1>
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
    </div>
  );
};

export default Home;
