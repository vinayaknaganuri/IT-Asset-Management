import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p className="mb-0">&copy; {new Date().getFullYear()} IELEKTRON TECHNOLOGIES ENGINEERING PVT. LTD. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
