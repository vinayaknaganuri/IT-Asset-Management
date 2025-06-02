import React, { useState } from 'react';
import './Stock.css';

const initialState = {
  os: '',
  systemName: '',
  model: '',
  processor: '',
  ram: '',
  storage: [],  // <-- change to array
};

const LaptopForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Toggle storage option in array
  const handleStorageClick = (value) => {
    setFormData(prev => {
      const storageSet = new Set(prev.storage);
      if (storageSet.has(value)) {
        storageSet.delete(value); // unselect if already selected
      } else {
        storageSet.add(value); // add if not selected
      }
      return { ...prev, storage: Array.from(storageSet) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare storage string for backend (if backend expects string)
    const payload = {
      ...formData,
      storage: formData.storage.join(', '), // join array to string, e.g. "256GB, 1TB"
    };

    try {
      const response = await fetch('http://localhost:5000/api/laptops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData(initialState);
        setError('');
      } else {
        const errorData = await response.json();
        console.error('❌ Backend error:', errorData);
        setError('Failed to submit data. Please try again.');
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setError('Network error. Please check the server.');
    }
  };

  return (
    <div className="laptop-form-container">
      <h2>Laptop Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>OS Name</label>
          <input name="os" value={formData.os} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Laptop BarCode No</label>
          <input name="systemName" value={formData.systemName} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>System Model</label>
          <input name="model" value={formData.model} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Processor</label>
          <input name="processor" value={formData.processor} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>RAM</label>
          <input name="ram" value={formData.ram} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Storage (Select multiple)</label>
          <div className="storage-options">
            {['256GB', '512GB', '1TB'].map(option => (
              <button
                type="button"
                key={option}
                className={`storage-btn ${formData.storage.includes(option) ? 'active' : ''}`}
                onClick={() => handleStorageClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {submitted && <div className="success-msg">✅ Laptop data submitted successfully!</div>}
      {error && <div className="error-msg">❌ {error}</div>}
    </div>
  );
};

export default LaptopForm;
