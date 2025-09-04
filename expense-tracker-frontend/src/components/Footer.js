import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = ({ menuOpen }) => {
  return (
    <footer className={`footer ${menuOpen ? "hidden" : ""}`}>
      <p>
        <FaRegCopyright /> {new Date().getFullYear()} Expense Tracker. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
