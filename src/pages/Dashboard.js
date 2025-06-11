import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboar.css'; // Ensure this file exists

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper d-flex flex-column">
      {/* Header */}
      <header className="dashboard-header px-4 py-2 shadow-sm bg-white">
        <h4 className="mb-0 fw-bold text-dark">Asset Management Dashboard</h4>
      </header>

      {/* Body */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside className="sidebar bg-white border-end p-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/bengalurudatabase">🧑‍💼 Employee Assets</Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/returnedassetsdb">🔁 Return Assets</Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/laptopstock">💻 Laptop Registration</Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/LaptopStockList">💻 Laptop Stock</Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/assetsstock">📦 Assets Registration</Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link" to="/assetsstocklist">📦 Assets Stock List</Link>
            </li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="main-content p-4 flex-grow-1 bg-light">
          <h2 className="fw-bold">Welcome to the Asset Dashboard</h2>
          <p>Select an option from the sidebar to manage your assets.</p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
