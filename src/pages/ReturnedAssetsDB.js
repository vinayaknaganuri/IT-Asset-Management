import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './Dashboar.css';

const ReturnedAssetsDB = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
    console.log('Deleting asset with id:', id);
    if (window.confirm('Are you sure you want to delete this record?')) {
      axios
        .delete(`http://localhost:5000/api/assets/return/${id}`)
        .then(() => fetchAssets())
        .catch((err) => console.error('Error deleting asset:', err));
    }
  };

  const filteredAssets = assets.filter(asset =>
    Object.values(asset).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

  return (
    <div className="container">
      <h2 className="mb-3">Returned Assets Tracking</h2>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search across all fields..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
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
                <th>S.No</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>OS</th>
                <th>System Name</th>
                <th>Model</th>
                <th>Processor</th>
                <th>RAM</th>
                <th>Storage</th>
                <th>Adapter Type</th>
                <th>Adapter Serial</th>
                <th>Mouse Type</th>
                <th>Mouse Serial</th>
                <th>Headset Type</th>
                <th>Headset Serial</th>
                <th>Bag</th>
                <th>Location</th>
                <th>Return Date</th>
                <th>Action</th>
              </tr>
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
                  <td colSpan="19" className="text-center">No data available</td>
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
