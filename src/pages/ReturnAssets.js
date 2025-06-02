import React, { useState } from 'react';
import './Dashboar.css';

const fields = [
  { label: 'Employee ID', name: 'employeeId', required: true },
  { label: 'Employee Name', name: 'employeeName', required: true },
  { label: 'OS Name', name: 'os' },
  { label: 'Laptop BarCode No', name: 'systemName' },
  { label: 'System Model', name: 'model' },
  { label: 'Processor', name: 'processor' },
  { label: 'RAM', name: 'ram' },
  // Multi-selection for storage
  { label: 'Storage', name: 'storage', type: 'multiButtonGroup', options: ['256GB', '512GB', '1TB'], required: true },
  { label: 'Adapter Type', name: 'adapterType' },
  { label: 'Adapter BarCode No', name: 'adapterSerial' },
  { label: 'Mouse Type', name: 'mouseType' },
  { label: 'Mouse BarCode No', name: 'mouseSerial' },
  { label: 'Headset Type', name: 'headsetType' },
  { label: 'Headset BarCode No', name: 'headsetSerial' },
  { label: 'Bag', name: 'bag', type: 'buttonGroup', options: ['Yes', 'No'] },
  { label: 'Location', name: 'location', type: 'select', options: ['Bengaluru', 'Pune', 'Chennai'], required: true },
  { label: 'Return Date', name: 'returnDate', type: 'date', required: true },
];

function ReturnAssetsForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSingleButtonChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleMultiButtonChange = (fieldName, value) => {
    setFormData((prev) => {
      const currentValues = prev[fieldName] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...prev, [fieldName]: updatedValues };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    for (const field of fields) {
      const value = formData[field.name];
      if (field.required && (value === '' || value == null || (Array.isArray(value) && value.length === 0))) {
        alert(`${field.label} is required!`);
        return;
      }
    }

    // Prepare payload
    const payload = {
      ...formData,
      storage: Array.isArray(formData.storage) ? formData.storage.join(', ') : formData.storage,
    };

    try {
      const response = await fetch('http://localhost:5000/api/assets/return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result.message);

      if (response.ok) {
        alert('Return recorded successfully!');
        setFormData({});
      } else {
        alert('Submission failed!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error connecting to server.');
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5">Return Assets</h2>
      <p>Please fill the form to return assigned assets.</p>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>

            {field.type === 'select' ? (
              <select
                className="form-control"
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
              >
                <option value="" disabled>
                  Select {field.label}
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === 'buttonGroup' ? (
              <div className="d-flex gap-2">
                {field.options.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`btn ${
                      formData[field.name] === option ? 'btn-primary' : 'btn-outline-secondary'
                    }`}
                    onClick={() => handleSingleButtonChange(field.name, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : field.type === 'multiButtonGroup' ? (
              <div className="d-flex gap-2 flex-wrap">
                {field.options.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`btn ${
                      (formData[field.name] || []).includes(option) ? 'btn-primary' : 'btn-outline-secondary'
                    }`}
                    onClick={() => handleMultiButtonChange(field.name, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type={field.type || 'text'}
                className="form-control"
                name={field.name}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-success">
          Submit Return
        </button>
      </form>
    </div>
  );
}

export default ReturnAssetsForm;
