import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const PublicNavbar = () => {
  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-pill px-4 py-2">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="logo-img" style={{ width: '50px', height: '50px' }} />
          <div className="d-flex flex-column">
                <h1 className='logo-text-header m-0'>Glory</h1>
                <p className='logo-text m-0'>Scout</p>
            </div>
        </div>
        
        <div className="navbar-collapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-2">
              <Link to="/" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/contact" className="nav-link text-white">Contact</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/faq" className="nav-link text-white">FAQ</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/player-profile" className="nav-link text-white">player-profile</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/player" className="nav-link text-white">Players</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/coach" className="nav-link text-white">Coaches</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/about" className="nav-link text-white">About Us</Link>
            </li>
          </ul>
        </div>
        
        <div className="d-flex">
          <Link to="/login" className="btn btn-link text-white text-decoration-none">Login</Link>
          <Link to="/signup" className="btn rounded-pill px-4 py-2" style={{ backgroundColor: '#33FF33' }}>Sign Up</Link>
        </div>
      </nav>
    </div>
  );
};

export default PublicNavbar;