import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

// Pages
import Home from './pages/Home.js';
import ReturnAssets from './pages/ReturnAssets.js';
import ReturnedAssetsDB from './pages/ReturnedAssetsDB.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import Bengaluru from './pages/Bengaluru.js';
import BengaluruDB from './pages/Bengalurudb.js';

// Stock pages
import LaptopForm from './pages/STOCK/LaptopForm.js';
import AssetsStock from './pages/STOCK/AsstesStock.js';
import LaptopFormDB from './pages/STOCK/LaptopFormDB.js';
import AssetsStockDB from './pages/STOCK/AsstesStockDB.js';

// Protected route wrapper
import ProtectedRoute from './pages/ProtectedRoute.js';

function App() {
  const authToken = localStorage.getItem('authToken');

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <div className="container mt-4 flex-grow-1">
          <Routes>
            {/* Redirect root based on auth */}
            <Route
              path="/"
              element={
                authToken ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
              }
            />

            {/* Public Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-return-assets" element={<ReturnAssets />} />
            <Route path="/returned-assets-db" element={<ReturnedAssetsDB />} />
            <Route path="/bengaluru-assets" element={<Bengaluru />} />
            <Route path="/bengaluru-database" element={<BengaluruDB />} />
            <Route path="/laptop-stock" element={<LaptopForm />} />
            <Route path="/assets-stock" element={<AssetsStock />} />
            <Route path="/laptop-stock-list" element={<LaptopFormDB />} />
            <Route path="/assets-stock-list" element={<AssetsStockDB />} />

            {/* Protected Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
