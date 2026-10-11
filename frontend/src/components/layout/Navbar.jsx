import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHeartbeat, FaUserCircle, FaBars, FaUserShield } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container">
        <Link className="navbar-brand text-primary-custom d-flex align-items-center fw-bold" to="/">
          <FaHeartbeat className="me-2 fs-3" />
          SmartCareN
        </Link>
        <button className="navbar-toggler border-0" type="button" onClick={toggleNavbar}>
          <FaBars className="text-primary-custom fs-4" />
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments" onClick={() => setIsOpen(false)}>Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/organ-donation" onClick={() => setIsOpen(false)}>Donate Organs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/donations" onClick={() => setIsOpen(false)}>Available Donations</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <NavLink 
                  className="nav-link text-primary fw-bold d-flex align-items-center" 
                  to="/admin" 
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserShield className="me-1 text-primary" /> Admin Portal
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle d-flex align-items-center fw-semibold text-dark" href="#" role="button" data-bs-toggle="dropdown">
                  <FaUserCircle className="fs-4 me-2 text-primary-custom" />
                  {user?.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                  <li><Link className="dropdown-item" to="/profile" onClick={() => setIsOpen(false)}>My Profile</Link></li>
                  {isAdmin && (
                    <li><Link className="dropdown-item text-primary" to="/admin" onClick={() => setIsOpen(false)}>Admin Portal</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={() => { logout(); setIsOpen(false); }}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link className="btn btn-outline-primary me-2" to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                <Link className="btn btn-primary" to="/register" onClick={() => setIsOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
