// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('authToken'); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token on logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar px-4 d-flex justify-content-between align-items-center bg-dark">
      <div className="d-flex align-items-center">
        <img src="/img/ielektron.jpg" alt="Logo" className="logo me-3" style={{ height: '50px' }} />
        <h1 className="text-white mb-0">IELEKTRON TECHNOLOGIES ENGINEERING PVT. LTD.</h1>
      </div>

      <div className="d-flex gap-2">
        <Link to="/">
          <Button color="primary">Home</Button>
        </Link>

        <Link to="/register-return-assets">
              <Button color="primary">Return Assets</Button>
            </Link>

        {!isLoggedIn ? (
          <Link to="/login">
            <Button color="primary">Login</Button>
          </Link>
        ) : (
          <>
            
            <Button color="danger" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
