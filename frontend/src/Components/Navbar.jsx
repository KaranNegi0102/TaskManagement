import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Navbar.css"; // Import CSS file for additional styling

const Navbar = ({ handleLogout, userName }) => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <h1 className="navbar-title">Hello, {userName}!</h1>
        <nav>
          <ul className="navbar-links">
            <li>
              <Link to="/home" className="navbar-link">Home</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="navbar-button">Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
