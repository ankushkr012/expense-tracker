import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt, FaTachometerAlt, FaBriefcase } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, username, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={isLoggedIn ? '/form' : '/'} className="navbar-logo">
          💰 Xpens
        </Link>
      </div>

      <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
        {isLoggedIn ? (
          <>
            <Link to="/list" className="nav-link" onClick={() => setMenuOpen(false)}><FaBriefcase /> Work</Link>
            <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}><FaTachometerAlt /> Dashboard</Link>
            {/*<Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}><FaUser /> {username || 'Profile'}</Link>*/}
            <span className="nav-link not-clickable"><FaUser /> {username || 'Profile'}</span>

            <button className="nav-link logout-btn" onClick={() => { handleLogout(); setMenuOpen(false); }}>
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaSignInAlt /> Login
            </Link>
            <Link to="/register" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaUserPlus /> Register
            </Link>
          </>
        )}
      </div>

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Fullscreen Overlay for Mobile */}
      {menuOpen && (
        <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`}>
         
          {isLoggedIn ? (
            <>
               <Link to="/list" className="nav-link" onClick={() => setMenuOpen(false)}><FaBriefcase /> Work</Link>
            <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}><FaTachometerAlt /> Dashboard</Link>
              {/*<Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>{username || 'Profile'}</Link>*/}
              <span className="nav-link not-clickable"><FaUser /> {username || 'Profile'}</span>
              <button className="nav-link logout-btn" onClick={() => { handleLogout(); setMenuOpen(false); }}><FaSignOutAlt />Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaSignInAlt /> Login
            </Link>
            <Link to="/register" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FaUserPlus /> Register
            </Link>
            </>
          )}
        </div>
      )}

    </nav>
  );
};

export default Navbar;
