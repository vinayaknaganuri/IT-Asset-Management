// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('authToken')); // Check login status

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear auth token
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar px-4 d-flex justify-content-between align-items-center bg-dark">
      <div className="d-flex align-items-center">
        <img
          src="/img/ielektron.jpg"
          alt="IELEKTRON Logo"
          className="logo me-3"
          style={{ height: '50px' }}
        />
        <h1 className="text-white mb-0" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          IELEKTRON TECHNOLOGIES ENGINEERING PVT. LTD.
        </h1>
      </div>

      <div className="d-flex gap-2">
        <Link to="/">
          <Button color="primary" aria-label="Home page">
            Home
          </Button>
        </Link>

        {isLoggedIn && (
          <Link to="/register-return-assets">
            <Button color="primary" aria-label="Register Return Assets page">
              Return Assets
            </Button>
          </Link>
        )}

        {!isLoggedIn ? (
          <Link to="/login">
            <Button color="primary" aria-label="Login page">
              Login
            </Button>
          </Link>
        ) : (
          <Button color="danger" onClick={handleLogout} aria-label="Logout">
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
