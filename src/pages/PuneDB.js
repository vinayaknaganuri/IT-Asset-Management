import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pune = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/assets/bengaluru')
      .then(res => setAssets(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Pune Asset Data</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>OS</th>
            <th>System</th>
            <th>Model</th>
            <th>Processor</th>
            <th>RAM</th>
            <th>Storage</th>
            <th>Adapter</th>
            <th>Mouse</th>
            <th>Headset</th>
            <th>Bag</th>
            <th>Assigned Date</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((item, index) => (
            <tr key={index}>
              <td>{item.employeeId}</td>
              <td>{item.employeeName}</td>
              <td>{item.os}</td>
              <td>{item.systemName}</td>
              <td>{item.model}</td>
              <td>{item.processor}</td>
              <td>{item.ram}</td>
              <td>{item.storage}</td>
              <td>{item.adapterType} - {item.adapterSerial}</td>
              <td>{item.mouseType} - {item.mouseSerial}</td>
              <td>{item.headsetType} - {item.headsetSerial}</td>
              <td>{item.bag}</td>
              <td>{item.date?.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pune;
