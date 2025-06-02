import React, { useState } from 'react';
import './Stock.css';

const LaptopForm = () => {
  // Adapter state
  const [adapterData, setAdapterData] = useState({
    adapterType: '',
    adapterBarcode: '',
    location: '',
  });
  const [adapterSubmitted, setAdapterSubmitted] = useState(false);
  const [adapterLoading, setAdapterLoading] = useState(false);
  const [adapterError, setAdapterError] = useState('');

  // Mouse state
  const [mouseData, setMouseData] = useState({
    mouseName: '',
    mouseBarcode: '',
    location: '',
  });
  const [mouseSubmitted, setMouseSubmitted] = useState(false);
  const [mouseLoading, setMouseLoading] = useState(false);
  const [mouseError, setMouseError] = useState('');

  // Headset state
  const [headsetData, setHeadsetData] = useState({
    headsetName: '',
    headsetBarcode: '',
    location: '',
  });
  const [headsetSubmitted, setHeadsetSubmitted] = useState(false);
  const [headsetLoading, setHeadsetLoading] = useState(false);
  const [headsetError, setHeadsetError] = useState('');

  // Handle input changes
  const handleChange = (e, setFunc) => {
    const { name, value } = e.target;
    setFunc(prev => ({ ...prev, [name]: value }));
  };

  // Submit helper
  const submitToDatabase = async (deviceData) => {
    try {
      const response = await fetch('http://localhost:5000/api/stock-devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deviceData),
      });

      if (!response.ok) throw new Error('Failed to submit');
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // Submit Adapter
  const submitAdapter = async (e) => {
    e.preventDefault();
    setAdapterLoading(true);
    setAdapterError('');
    try {
      const deviceData = {
        type: 'Adapter',
        name: adapterData.adapterType,
        barcode: adapterData.adapterBarcode,
        location: adapterData.location,
      };
      await submitToDatabase(deviceData);
      setAdapterSubmitted(true);
      setAdapterData({ adapterType: '', adapterBarcode: '', location: '' });
      setTimeout(() => setAdapterSubmitted(false), 3000);
    } catch (error) {
      setAdapterError('Failed to submit adapter');
    }
    setAdapterLoading(false);
  };

  // Submit Mouse
  const submitMouse = async (e) => {
    e.preventDefault();
    setMouseLoading(true);
    setMouseError('');
    try {
      const deviceData = {
        type: 'Mouse',
        name: mouseData.mouseName,
        barcode: mouseData.mouseBarcode,
        location: mouseData.location,
      };
      await submitToDatabase(deviceData);
      setMouseSubmitted(true);
      setMouseData({ mouseName: '', mouseBarcode: '', location: '' });
      setTimeout(() => setMouseSubmitted(false), 3000);
    } catch (error) {
      setMouseError('Failed to submit mouse');
    }
    setMouseLoading(false);
  };

  // Submit Headset
  const submitHeadset = async (e) => {
    e.preventDefault();
    setHeadsetLoading(true);
    setHeadsetError('');
    try {
      const deviceData = {
        type: 'Headset',
        name: headsetData.headsetName,
        barcode: headsetData.headsetBarcode,
        location: headsetData.location,
      };
      await submitToDatabase(deviceData);
      setHeadsetSubmitted(true);
      setHeadsetData({ headsetName: '', headsetBarcode: '', location: '' });
      setTimeout(() => setHeadsetSubmitted(false), 3000);
    } catch (error) {
      setHeadsetError('Failed to submit headset');
    }
    setHeadsetLoading(false);
  };

  return (
    <div className="laptop-form-container">
      <h2>Device Registration</h2>

      {/* Adapter Section */}
      <form onSubmit={submitAdapter}>
        <h4>Adapter</h4>
        <div className="form-row">
          <label>Adapter Name</label>
          <input
            name="adapterType"
            value={adapterData.adapterType}
            onChange={(e) => handleChange(e, setAdapterData)}
            required
          />
        </div>
        <div className="form-row">
          <label>Adapter Barcode No</label>
          <input
            name="adapterBarcode"
            value={adapterData.adapterBarcode}
            onChange={(e) => handleChange(e, setAdapterData)}
            required
          />
        </div>
        <div className="form-row">
          <label>Location</label>
          <select
            name="location"
            value={adapterData.location}
            onChange={(e) => handleChange(e, setAdapterData)}
            required
          >
            <option value="">-- Select Location --</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
        <button type="submit" disabled={adapterLoading} className="submit-btn">
          {adapterLoading ? 'Submitting...' : 'Submit'}
        </button>
        {adapterSubmitted && <div className="success-msg">Adapter submitted successfully!</div>}
        {adapterError && <div className="error-msg">{adapterError}</div>}
      </form>

      {/* Mouse Section */}
      <form onSubmit={submitMouse}>
        <h4 className="mt-4">Mouse</h4>
        <div className="form-row">
          <label>Mouse Name</label>
          <input
            name="mouseName"
            value={mouseData.mouseName}
            onChange={(e) => handleChange(e, setMouseData)}
            required
          />
        </div>
        <div className="form-row">
          <label>Mouse Barcode No</label>
          <input
            name="mouseBarcode"
            value={mouseData.mouseBarcode}
            onChange={(e) => handleChange(e, setMouseData)}
            required
          />
        </div>
        <div className="form-row">
          <label>Location</label>
          <select
            name="location"
            value={mouseData.location}
            onChange={(e) => handleChange(e, setMouseData)}
            required
          >
            <option value="">-- Select Location --</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
        <button type="submit" disabled={mouseLoading} className="submit-btn">
          {mouseLoading ? 'Submitting...' : 'Submit'}
        </button>
        {mouseSubmitted && <div className="success-msg">Mouse submitted successfully!</div>}
        {mouseError && <div className="error-msg">{mouseError}</div>}
      </form>

      {/* Headset Section */}
      <form onSubmit={submitHeadset}>
        <h4 className="mt-4">Headset</h4>
        <div className="form-row">
          <label>Headset Name</label>
          <input
            name="headsetName"
            value={headsetData.headsetName}
            onChange={(e) => handleChange(e, setHeadsetData)}
            required
          />
        </div>
        <div className="form-row">
          <label>Headset Barcode No</label>
          <input
            name="headsetBarcode"
            value={headsetData.headsetBarcode}
            onChange={(e) => handleChange(e, setHeadsetData)}
            required
          />
        </div>
        <div className="form-row">
          <label>Location</label>
          <select
            name="location"
            value={headsetData.location}
            onChange={(e) => handleChange(e, setHeadsetData)}
            required
          >
            <option value="">-- Select Location --</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
        <button type="submit" disabled={headsetLoading} className="submit-btn">
          {headsetLoading ? 'Submitting...' : 'Submit'}
        </button>
        {headsetSubmitted && <div className="success-msg">Headset submitted successfully!</div>}
        {headsetError && <div className="error-msg">{headsetError}</div>}
      </form>
    </div>
  );
};

export default LaptopForm;
