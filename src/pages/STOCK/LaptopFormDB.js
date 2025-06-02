import React, { useEffect, useState } from 'react';
import './Stock.css';

const LaptopDB = () => {
  const [laptops, setLaptops] = useState([]);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    os: '',
    systemName: '',
    model: '',
    processor: '',
    ram: '',
    storage: '',
  });

  const [showSearch, setShowSearch] = useState({
    os: false,
    systemName: false,
    model: false,
    processor: false,
    ram: false,
    storage: false,
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

  const toggleSearch = (key) => {
    setShowSearch((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
              <th>S.No.</th>

              {/* OS */}
              <th className="nowrap-header">
                <div className="header-flex">
                  <span>OS</span>
                  <button className="small-toggle-btn" onClick={() => toggleSearch('os')} title="Toggle OS Search">🔍</button>
                </div>
                {showSearch.os && (
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search OS"
                    value={filters.os}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, os: e.target.value }))
                    }
                  />
                )}
              </th>

              {/* System Name */}
              <th className="nowrap-header">
                <div className="header-flex">
                  <span>Laptop Barcode No.</span>
                  <button className="small-toggle-btn" onClick={() => toggleSearch('systemName')} title="Toggle Barcode Search">🔍</button>
                </div>
                {showSearch.systemName && (
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search Barcode"
                    value={filters.systemName}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, systemName: e.target.value }))
                    }
                  />
                )}
              </th>

              {/* Model */}
              <th className="nowrap-header">
                <div className="header-flex">
                  <span>Model</span>
                  <button className="small-toggle-btn" onClick={() => toggleSearch('model')} title="Toggle Model Search">🔍</button>
                </div>
                {showSearch.model && (
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search Model"
                    value={filters.model}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, model: e.target.value }))
                    }
                  />
                )}
              </th>

              {/* Processor */}
              <th className="nowrap-header">
                <div className="header-flex">
                  <span>Processor</span>
                  <button className="small-toggle-btn" onClick={() => toggleSearch('processor')} title="Toggle Processor Search">🔍</button>
                </div>
                {showSearch.processor && (
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search Processor"
                    value={filters.processor}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, processor: e.target.value }))
                    }
                  />
                )}
              </th>

              {/* RAM */}
              <th className="nowrap-header">
                <div className="header-flex">
                  <span>RAM</span>
                  <button className="small-toggle-btn" onClick={() => toggleSearch('ram')} title="Toggle RAM Search">🔍</button>
                </div>
                {showSearch.ram && (
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search RAM"
                    value={filters.ram}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, ram: e.target.value }))
                    }
                  />
                )}
              </th>

              {/* Storage */}
              <th className="nowrap-header">
                <div className="header-flex">
                  <span>Storage</span>
                  <button className="small-toggle-btn" onClick={() => toggleSearch('storage')} title="Toggle Storage Search">🔍</button>
                </div>
                {showSearch.storage && (
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search Storage"
                    value={filters.storage}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, storage: e.target.value }))
                    }
                  />
                )}
              </th>

              <th>Action</th>
            </tr>
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
