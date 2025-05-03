import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <div className="container mt-4">
      <nav className={`navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 ${isOpen ? '' : 'rounded-pill'}`}>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img src={logo} alt="Logo" className="logo-img me-2" style={{ width: '50px', height: '50px' }} />
            <div className="d-flex flex-column">
              <h1 className='logo-text-header m-0'>Glory</h1>
              <p className='logo-text m-0'>Scout</p>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarContent">
            <ul className="navbar-nav mx-auto mt-3 mt-lg-0">
              <li className="nav-item mx-2">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white'}`} 
    style={({ isActive }) => isActive ? { color: '#33FF33' } : {}}>Home</NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink to="/player" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white'}`} 
    style={({ isActive }) => isActive ? { color: '#33FF33' } : {}}>Players</NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink to="/coach" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white'}`} 
    style={({ isActive }) => isActive ? { color: '#33FF33' } : {}}>Coaches</NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white'}`} 
    style={({ isActive }) => isActive ? { color: '#33FF33' } : {}}>About Us</NavLink>
              </li>
            </ul>

            <div className="d-flex gap-2 mt-3 mt-lg-0">
              <NavLink to="/login" className={({ isActive }) => `btn btn-link text-decoration-none ${isActive ? 'text-success' : 'text-white'}`}>Login</NavLink>
              <NavLink to="/signup" className="btn rounded-pill px-4 py-2" style={{ backgroundColor: '#33FF33', color: 'black' }}>Sign Up</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PublicNavbar;
