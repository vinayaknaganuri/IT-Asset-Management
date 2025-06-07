import React, { useEffect, useState } from 'react';
import './Stock.css';

const LaptopDB = () => {
  const [laptops, setLaptops] = useState([]);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    os: '',
    systemName: '',
    model: '',
    processor: '',
    ram: '',
    storage: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/laptops')
      .then((res) => res.json())
      .then((data) => setLaptops(data))
      .catch((err) => {
        console.error(err);
        setError('❌ Failed to fetch laptop data.');
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/laptops/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setLaptops((prev) => prev.filter((laptop) => laptop.id !== id));
      } else {
        alert('❌ Delete failed.');
      }
    } catch (err) {
      console.error('❌ Delete Error:', err);
    }
  };

  const downloadCSV = (data) => {
    const csvRows = [];
    const headers = ['S.No.', 'OS', 'Laptop Barcode No.', 'Model', 'Processor', 'RAM', 'Storage'];
    csvRows.push(headers.join(','));

    data.forEach((laptop, index) => {
      const row = [
        index + 1,
        laptop.os,
        laptop.systemName,
        laptop.model,
        laptop.processor,
        laptop.ram,
        laptop.storage,
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'laptop_database.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLaptops = laptops.filter((laptop) =>
    laptop.os?.toLowerCase().includes(filters.os.toLowerCase()) &&
    laptop.systemName?.toLowerCase().includes(filters.systemName.toLowerCase()) &&
    laptop.model?.toLowerCase().includes(filters.model.toLowerCase()) &&
    laptop.processor?.toLowerCase().includes(filters.processor.toLowerCase()) &&
    laptop.ram?.toLowerCase().includes(filters.ram.toLowerCase()) &&
    laptop.storage?.toLowerCase().includes(filters.storage.toLowerCase())
  );

  const handleFilterChange = (e, key) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div className="laptopdb-container">
      <h2>Laptop Database</h2>
      {error && <div className="error-msg">{error}</div>}

      <button onClick={() => downloadCSV(filteredLaptops)} style={{ marginBottom: '15px' }}>
        Download Excel
      </button>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>
                <div className="header-flex">
                  <span>S.No.</span>
                  <button
                    className="small-toggle-btn"
                    onClick={() => setShowFilters(!showFilters)}
                    title="Toggle Filters"
                  >
                    🔍
                  </button>
                </div>
              </th>
              <th><span className="header-flex">OS</span></th>
              <th><span className="header-flex">Laptop Barcode No.</span></th>
              <th><span className="header-flex">Model</span></th>
              <th><span className="header-flex">Processor</span></th>
              <th><span className="header-flex">RAM</span></th>
              <th><span className="header-flex">Storage</span></th>
              <th><span className="header-flex">Action</span></th>
            </tr>
            {showFilters && (
              <tr>
                <th></th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search OS"
                    value={filters.os}
                    onChange={(e) => handleFilterChange(e, 'os')}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search Barcode"
                    value={filters.systemName}
                    onChange={(e) => handleFilterChange(e, 'systemName')}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search Model"
                    value={filters.model}
                    onChange={(e) => handleFilterChange(e, 'model')}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search Processor"
                    value={filters.processor}
                    onChange={(e) => handleFilterChange(e, 'processor')}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search RAM"
                    value={filters.ram}
                    onChange={(e) => handleFilterChange(e, 'ram')}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search Storage"
                    value={filters.storage}
                    onChange={(e) => handleFilterChange(e, 'storage')}
                  />
                </th>
                <th></th>
              </tr>
            )}
          </thead>
          <tbody>
            {filteredLaptops.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  No laptops found.
                </td>
              </tr>
            ) : (
              filteredLaptops.map((laptop, index) => (
                <tr key={laptop.id}>
                  <td>{index + 1}</td>
                  <td>{laptop.os}</td>
                  <td>{laptop.systemName}</td>
                  <td>{laptop.model}</td>
                  <td>{laptop.processor}</td>
                  <td>{laptop.ram}</td>
                  <td>{laptop.storage}</td>
                  <td>
                    <button onClick={() => handleDelete(laptop.id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaptopDB;
