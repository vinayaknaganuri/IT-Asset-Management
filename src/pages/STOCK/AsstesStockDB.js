import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import './Stock.css';

const AssetsStockDB = () => {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm] = useState('');

  const [typeFilter, setTypeFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [barcodeFilter, setBarcodeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showNameFilter, setShowNameFilter] = useState(false);
  const [showBarcodeFilter, setShowBarcodeFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stock-devices');
        if (!response.ok) throw new Error('Failed to fetch stock data');
        const data = await response.json();
        setStock(data);
        setFilteredStock(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchStock();
  }, []);

  useEffect(() => {
    let filtered = stock;

    if (typeFilter) {
      filtered = filtered.filter(item =>
        item.deviceType.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }
    if (nameFilter) {
      filtered = filtered.filter(item =>
        item.deviceName.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (barcodeFilter) {
      filtered = filtered.filter(item =>
        item.barcode.toLowerCase().includes(barcodeFilter.toLowerCase())
      );
    }
    if (locationFilter) {
      filtered = filtered.filter(item =>
        item.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        [item.deviceType, item.deviceName, item.barcode, item.location]
          .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredStock(filtered);
  }, [stock, typeFilter, nameFilter, barcodeFilter, locationFilter, searchTerm]);

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
              <th className="th">S.No</th>

              <th className="th">
                Type
                <button className="filter-toggle-btn" onClick={() => setShowTypeFilter(!showTypeFilter)}>🔍</button>
                {showTypeFilter && (
                  <input
                    type="text"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="filter-input"
                  />
                )}
              </th>

              <th className="th">
                Name
                <button className="filter-toggle-btn" onClick={() => setShowNameFilter(!showNameFilter)}>🔍</button>
                {showNameFilter && (
                  <input
                    type="text"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="filter-input"
                  />
                )}
              </th>

              <th className="th">
                Barcode
                <button className="filter-toggle-btn" onClick={() => setShowBarcodeFilter(!showBarcodeFilter)}>🔍</button>
                {showBarcodeFilter && (
                  <input
                    type="text"
                    value={barcodeFilter}
                    onChange={(e) => setBarcodeFilter(e.target.value)}
                    className="filter-input"
                  />
                )}
              </th>

              <th className="th">
                Location
                <button className="filter-toggle-btn" onClick={() => setShowLocationFilter(!showLocationFilter)}>🔍</button>
                {showLocationFilter && (
                  <input
                    type="text"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="filter-input"
                  />
                )}
              </th>

              <th className="th">Actions</th>
            </tr>
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
