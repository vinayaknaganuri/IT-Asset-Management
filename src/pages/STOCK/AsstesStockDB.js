import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import './Stock.css';

const AssetsStockDB = () => {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filters for each column
  const [filters, setFilters] = useState({
    deviceType: '',
    deviceName: '',
    barcode: '',
    location: '',
  });

  // Fetch data from backend
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stock-devices');
        if (!response.ok) throw new Error('Failed to fetch stock data');
        const data = await response.json();
        console.log("Fetched data:", data); // Debug: check keys
        setStock(data);
        setFilteredStock(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchStock();
  }, []);

  // Apply filters to data
  useEffect(() => {
    let filtered = stock;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(item =>
          item[key]?.toString().toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    setFilteredStock(filtered);
  }, [stock, filters]);

  // Filter input handler
  const handleFilterChange = (e, key) => {
    setFilters(prev => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // Delete item by barcode
  const handleDelete = async (barcode) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/stock-devices/barcode/${barcode}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');

      const updatedStock = stock.filter(item => item.barcode !== barcode);
      setStock(updatedStock);

      alert('✅ Deleted successfully.');
    } catch (err) {
      alert('❌ Error deleting item: ' + err.message);
    }
  };

  // Export to Excel
  const handleExportToExcel = () => {
    const wsData = filteredStock.map((item, index) => ({
      'S.No': index + 1,
      Type: item.deviceType,
      Name: item.deviceName,
      Barcode: item.barcode,
      Location: item.location,
    }));

    const worksheet = XLSX.utils.json_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Assets Stock');
    XLSX.writeFile(workbook, 'AssetsStockData.xlsx');
  };

  return (
    <div className="container">
      <h2 className="heading">Assets Stock Database</h2>

      <div className="top-bar">
        <button className="download-button" onClick={handleExportToExcel}>
          📥 Download Excel
        </button>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th className="th">
                <div className="header-with-icon">
                  <span>S.No</span>
                  <button
                    className="filter-toggle-btn"
                    onClick={() => setShowFilters(!showFilters)}
                    title="Toggle Filters"
                    aria-label="Toggle Filters"
                  >
                    🔍
                  </button>
                </div>
              </th>
              <th className="th">Type</th>
              <th className="th">Name</th>
              <th className="th">Barcode</th>
              <th className="th">Location</th>
              <th className="th">Actions</th>
            </tr>
            {showFilters && (
              <tr>
                <th></th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter Type"
                    value={filters.deviceType}
                    onChange={e => handleFilterChange(e, 'deviceType')}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter Name"
                    value={filters.deviceName}
                    onChange={e => handleFilterChange(e, 'deviceName')}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter Barcode"
                    value={filters.barcode}
                    onChange={e => handleFilterChange(e, 'barcode')}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter Location"
                    value={filters.location}
                    onChange={e => handleFilterChange(e, 'location')}
                  />
                </th>
                <th></th>
              </tr>
            )}
          </thead>
          <tbody>
            {filteredStock.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data-row">
                  No data available
                </td>
              </tr>
            ) : (
              filteredStock.map((item, index) => (
                <tr key={item.barcode} className="tr">
                  <td className="td">{index + 1}</td>
                  <td className="td">{item.deviceType}</td>
                  <td className="td">{item.deviceName}</td>
                  <td className="td">{item.barcode}</td>
                  <td className="td">{item.location}</td>
                  <td className="td">
                    <button className="button" onClick={() => handleDelete(item.barcode)}>
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssetsStockDB;
