import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


// Shared layout components
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

// Main pages
import Home from './pages/Home.js';
import ReturnAssets from './pages/ReturnAssets.js';
import ReturnedAssetsDB from './pages/ReturnedAssetsDB.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Bengaluru from './pages/Bengaluru.js';
import BengaluruDB from './pages/Bengalurudb.js';

// Stock pages
import LaptopForm from './pages/STOCK/LaptopForm.js';
import AssetsStock from './pages/STOCK/AsstesStock.js';       // consider renaming file to AssetsStock.js
import LaptopFormDB from './pages/STOCK/LaptopFormDB.js';
import AssetsStockDB from './pages/STOCK/AsstesStockDB.js';   // consider renaming file to AssetsStockDB.js

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <div className="container mt-4 flex-grow-1">
          <Routes>
            {/* Home & Auth */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Asset Return */}
            <Route path="/register-return-assets" element={<ReturnAssets />} />
            <Route path="/returned-assets-db" element={<ReturnedAssetsDB />} />

            {/* Asset Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bengaluru-assets" element={<Bengaluru />} />
            <Route path="/bengaluru-database" element={<BengaluruDB />} />

            {/* Stock Registration */}
            <Route path="/laptop-stock" element={<LaptopForm />} />
            <Route path="/assets-stock" element={<AssetsStock />} />

            {/* Stock Databases */}
            <Route path="/laptop-stock-list" element={<LaptopFormDB />} />
            <Route path="/assets-stock-list" element={<AssetsStockDB />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
