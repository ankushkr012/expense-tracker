import React from "react";
import Navbar from "../components/Navbar";
//import Footer from "../components/Footer";
import "../styles/layout.css";

const Layout = ({ children, isLoggedIn, username, handleLogout }) => {
  return (
    <div className="layout-wrapper">
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        handleLogout={handleLogout}
      />
      <main className="layout-content">{children}</main>
     {/* <Footer /> */}
    </div>
  );
};

export default Layout;
