import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './Dashboar.css';

const BengaluruDB = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Show/hide filter row
  const [showFilter, setShowFilter] = useState(false);

  // Column-wise filters
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
    assignedDate: '',
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = () => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/assets/bengaluru`)
      .then(res => {
        setAssets(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios.delete(`http://localhost:5000/api/assets/bengaluru/${id}`)
        .then(() => fetchAssets())
        .catch(err => console.error('Error deleting asset:', err));
    }
  };

  // Filter assets based on filters only (no global search bar)
  const filteredAssets = assets.filter(asset => {
    // column-wise filters check (all filters must match if set)
    return Object.entries(filters).every(([key, filterValue]) => {
      if (!filterValue) return true; // no filter for this column
      const assetValue = asset[key];
      if (!assetValue) return false;
      return assetValue.toString().toLowerCase().includes(filterValue.toLowerCase());
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
      "Assigned Date": item.assignedDate ? new Date(item.assignedDate).toLocaleDateString() : "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataWithSerials);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Assets");
    XLSX.writeFile(workbook, "Bengaluru_Assets.xlsx");
  };

  const handleFilterChange = (e, key) => {
    setFilters(prev => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // Styles to keep text in one line and enable horizontal scroll on table container
  const containerStyle = {
    overflowX: 'auto',
    maxHeight: "500px",
  };

  const cellStyle = {
    whiteSpace: 'nowrap',
  };

  return (
    <div className="container">
      <h2 className="mb-3">Asset Tracking</h2>

      <div className="d-flex justify-content-between mb-3">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="btn btn-outline-primary me-2"
          title="Toggle Filters"
        >
          🔍 Filter
        </button>
        <button onClick={exportToExcel} className="btn btn-success">
          Download Excel
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive" style={containerStyle}>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th style={cellStyle}>S.No</th>
                <th style={cellStyle}>Employee ID</th>
                <th style={cellStyle}>Employee Name</th>
                <th style={cellStyle}>OS</th>
                <th style={cellStyle}>Laptop BarCode No</th>
                <th style={cellStyle}>Model</th>
                <th style={cellStyle}>Processor</th>
                <th style={cellStyle}>RAM</th>
                <th style={cellStyle}>Storage</th>
                <th style={cellStyle}>Adapter Type</th>
                <th style={cellStyle}>Adapter Serial</th>
                <th style={cellStyle}>Mouse Type</th>
                <th style={cellStyle}>Mouse Serial</th>
                <th style={cellStyle}>Headset Type</th>
                <th style={cellStyle}>Headset Serial</th>
                <th style={cellStyle}>Bag</th>
                <th style={cellStyle}>Location</th>
                <th style={cellStyle}>Assigned Date</th>
                <th style={cellStyle}>Action</th>
              </tr>
              {showFilter && (
                <tr>
                  <th></th> {/* No filter for S.No */}
                  {Object.keys(filters).map((key) => (
                    <th key={key}>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder={`Filter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                        value={filters[key]}
                        onChange={(e) => handleFilterChange(e, key)}
                        style={{ whiteSpace: 'normal' }}
                      />
                    </th>
                  ))}
                  <th></th> {/* No filter for action */}
                </tr>
              )}
            </thead>
            <tbody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((item, index) => (
                  <tr key={item.id}>
                    <td style={cellStyle}>{index + 1}</td>
                    <td style={cellStyle}>{item.employeeId}</td>
                    <td style={cellStyle}>{item.employeeName}</td>
                    <td style={cellStyle}>{item.os}</td>
                    <td style={cellStyle}>{item.systemName}</td>
                    <td style={cellStyle}>{item.model}</td>
                    <td style={cellStyle}>{item.processor}</td>
                    <td style={cellStyle}>{item.ram}</td>
                    <td style={cellStyle}>{item.storage}</td>
                    <td style={cellStyle}>{item.adapterType}</td>
                    <td style={cellStyle}>{item.adapterSerial}</td>
                    <td style={cellStyle}>{item.mouseType}</td>
                    <td style={cellStyle}>{item.mouseSerial}</td>
                    <td style={cellStyle}>{item.headsetType}</td>
                    <td style={cellStyle}>{item.headsetSerial}</td>
                    <td style={cellStyle}>{item.bag}</td>
                    <td style={cellStyle}>{item.location}</td>
                    <td style={cellStyle}>{item.assignedDate ? new Date(item.assignedDate).toLocaleDateString() : "N/A"}</td>
                    <td style={cellStyle}>
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
                <tr><td colSpan="19" className="text-center">No data available</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BengaluruDB;
