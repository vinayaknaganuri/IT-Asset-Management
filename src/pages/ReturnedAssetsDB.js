import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './Dashboar.css';

const ReturnedAssetsDB = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);  // <-- filter toggle state

  // Filters state for each column
  const [filters, setFilters] = useState({
    employeeId: '',
    employeeName: '',
    os: '',
    systemName: '',
    model: '',
    processor: '',
    ram: '',
    storage: '',
    adapterType: '',
    adapterSerial: '',
    mouseType: '',
    mouseSerial: '',
    headsetType: '',
    headsetSerial: '',
    bag: '',
    location: '',
    returnDate: '',
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = () => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/assets/return')
      .then((res) => {
        setAssets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      axios
        .delete(`http://localhost:5000/api/assets/return/${id}`)
        .then(() => fetchAssets())
        .catch((err) => console.error('Error deleting asset:', err));
    }
  };

  // Filter assets based on filters applied for each column
  const filteredAssets = assets.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // no filter for this column
      const itemValue = item[key];
      if (!itemValue) return false;

      if (key === 'returnDate') {
        const dateString = new Date(itemValue).toLocaleDateString();
        return dateString.toLowerCase().includes(value.toLowerCase());
      }

      return itemValue.toString().toLowerCase().includes(value.toLowerCase());
    });
  });

  const exportToExcel = () => {
    const dataWithSerials = filteredAssets.map((item, index) => ({
      "S.No": index + 1,
      "Employee ID": item.employeeId,
      "Employee Name": item.employeeName,
      "OS": item.os,
      "System Name": item.systemName,
      "Model": item.model,
      "Processor": item.processor,
      "RAM": item.ram,
      "Storage": item.storage,
      "Adapter Type": item.adapterType,
      "Adapter Serial": item.adapterSerial,
      "Mouse Type": item.mouseType,
      "Mouse Serial": item.mouseSerial,
      "Headset Type": item.headsetType,
      "Headset Serial": item.headsetSerial,
      "Bag": item.bag,
      "Location": item.location,
      "Return Date": item.returnDate ? new Date(item.returnDate).toLocaleDateString() : "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataWithSerials);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Returned_Assets");
    XLSX.writeFile(workbook, "Returned_Assets.xlsx");
  };

  // Small inline styles for header label + input layout
  const thStyle = { whiteSpace: 'nowrap', verticalAlign: 'middle' };
  //const flexDivStyle = { display: 'flex', alignItems: 'center', gap: '6px' };
  const inputStyle = { width: '90px', margin: 0, padding: '2px 6px' };

  return (
    <div className="container">
      <h2 className="mb-3">Returned Assets Tracking</h2>

      <div className="d-flex justify-content-between mb-3">
        <button onClick={exportToExcel} className="btn btn-success">
          Download Excel
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th style={thStyle}>
                  S.No
                  <button
                    style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none', color: 'white', fontSize: '18px' }}
                    onClick={() => setShowFilters(!showFilters)}
                    title={showFilters ? "Hide Filters" : "Show Filters"}
                  >
                    🔍
                  </button>
                </th>
                {/* For the other headers, just show label only */}
                <th style={thStyle}>Employee ID</th>
                <th style={thStyle}>Employee Name</th>
                <th style={thStyle}>OS</th>
                <th style={thStyle}>System Name</th>
                <th style={thStyle}>Model</th>
                <th style={thStyle}>Processor</th>
                <th style={thStyle}>RAM</th>
                <th style={thStyle}>Storage</th>
                <th style={thStyle}>Adapter Type</th>
                <th style={thStyle}>Adapter Serial</th>
                <th style={thStyle}>Mouse Type</th>
                <th style={thStyle}>Mouse Serial</th>
                <th style={thStyle}>Headset Type</th>
                <th style={thStyle}>Headset Serial</th>
                <th style={thStyle}>Bag</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Return Date</th>
                <th style={thStyle}>Action</th>
              </tr>

              {/* Filter Inputs row - only visible if showFilters is true */}
              {showFilters && (
                <tr>
                  <th></th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.employeeId}
                      onChange={(e) => setFilters((prev) => ({ ...prev, employeeId: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={{ ...inputStyle, width: '110px' }}
                      value={filters.employeeName}
                      onChange={(e) => setFilters((prev) => ({ ...prev, employeeName: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={{ ...inputStyle, width: '80px' }}
                      value={filters.os}
                      onChange={(e) => setFilters((prev) => ({ ...prev, os: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.systemName}
                      onChange={(e) => setFilters((prev) => ({ ...prev, systemName: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.model}
                      onChange={(e) => setFilters((prev) => ({ ...prev, model: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.processor}
                      onChange={(e) => setFilters((prev) => ({ ...prev, processor: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.ram}
                      onChange={(e) => setFilters((prev) => ({ ...prev, ram: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.storage}
                      onChange={(e) => setFilters((prev) => ({ ...prev, storage: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.adapterType}
                      onChange={(e) => setFilters((prev) => ({ ...prev, adapterType: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.adapterSerial}
                      onChange={(e) => setFilters((prev) => ({ ...prev, adapterSerial: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.mouseType}
                      onChange={(e) => setFilters((prev) => ({ ...prev, mouseType: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.mouseSerial}
                      onChange={(e) => setFilters((prev) => ({ ...prev, mouseSerial: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.headsetType}
                      onChange={(e) => setFilters((prev) => ({ ...prev, headsetType: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.headsetSerial}
                      onChange={(e) => setFilters((prev) => ({ ...prev, headsetSerial: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.bag}
                      onChange={(e) => setFilters((prev) => ({ ...prev, bag: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={inputStyle}
                      value={filters.location}
                      onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="Filter"
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={{ ...inputStyle, width: '100px' }}
                      value={filters.returnDate}
                      onChange={(e) => setFilters((prev) => ({ ...prev, returnDate: e.target.value }))}
                      placeholder="Filter (e.g., 6/7/2025)"
                    />
                  </th>
                  <th></th>
                </tr>
              )}
            </thead>

            <tbody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.employeeId}</td>
                    <td>{item.employeeName}</td>
                    <td>{item.os}</td>
                    <td>{item.systemName}</td>
                    <td>{item.model}</td>
                    <td>{item.processor}</td>
                    <td>{item.ram}</td>
                    <td>{item.storage}</td>
                    <td>{item.adapterType}</td>
                    <td>{item.adapterSerial}</td>
                    <td>{item.mouseType}</td>
                    <td>{item.mouseSerial}</td>
                    <td>{item.headsetType}</td>
                    <td>{item.headsetSerial}</td>
                    <td>{item.bag}</td>
                    <td>{item.location}</td>
                    <td>{item.returnDate ? new Date(item.returnDate).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="19" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReturnedAssetsDB;
