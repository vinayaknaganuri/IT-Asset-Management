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
  { label: 'Storage', name: 'storage', type: 'multiButtonGroup', options: ['256GB', '512GB', '1TB'], required: true },
  { label: 'Adapter Type', name: 'adapterType' },
  { label: 'Adapter BarCode No', name: 'adapterSerial' },
  { label: 'Mouse Type', name: 'mouseType' },
  { label: 'Mouse BarCode No', name: 'mouseSerial' },
  { label: 'Headset Type', name: 'headsetType' },
  { label: 'Headset Serial Number', name: 'headsetSerial' },
  { label: 'Bag', name: 'bag', type: 'buttonGroup', options: ['Yes', 'No'] },
  { label: 'Location', name: 'location', type: 'select', options: ['Bengaluru', 'Pune', 'Chennai'], required: true },
  { label: 'Assigned Date', name: 'assignedDate', type: 'date', required: true },
];

function Bengaluru() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonGroupChange = (fieldName, value) => {
    setFormData((prev) => {
      const current = prev[fieldName] || [];
      if (current.includes(value)) {
        return { ...prev, [fieldName]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [fieldName]: [...current, value] };
      }
    });
  };

  const handleSingleButtonChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.assignedDate) {
      alert('Assigned Date is required!');
      return;
    }

    const payload = {
      ...formData,
      storage: Array.isArray(formData.storage) ? formData.storage.join(', ') : formData.storage,
    };

    try {
      const response = await fetch('http://localhost:5000/api/assets/bengaluru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result.message);

      if (response.ok) {
        alert('Form submitted successfully!');
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
      <h2 className="mt-5">Assets Register</h2>
      <p>Here you can register or manage Bengaluru assets.</p>

      <form onSubmit={handleSubmit}>
  {fields.map((field) => (
    <div className="mb-3" key={field.name}>
      <label className="form-label custom-label">
        {field.label} {field.required && <span className="text-danger">*</span>}
      </label>

      {field.type === 'select' ? (
        <select
          className="form-select form-select-sm uniform-field"
          name={field.name}
          value={formData[field.name] || ''}
          onChange={handleChange}
          required={field.required}
        >
          <option value="" disabled>Select Location</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === 'multiButtonGroup' ? (
        <div className="d-flex gap-2 flex-wrap">
          {field.options.map((option) => (
            <button
              type="button"
              key={option}
              className={`btn btn-sm uniform-btn ${
                Array.isArray(formData[field.name]) && formData[field.name].includes(option)
                  ? 'btn-primary'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonGroupChange(field.name, option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : field.type === 'buttonGroup' ? (
        <div className="d-flex gap-2">
          {field.options.map((option) => (
            <button
              type="button"
              key={option}
              className={`btn btn-sm uniform-btn ${
                formData[field.name] === option ? 'btn-primary' : 'btn-outline-secondary'
              }`}
              onClick={() => handleSingleButtonChange(field.name, option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <input
          type={field.type || 'text'}
          className="form-control form-control-sm uniform-field"
          name={field.name}
          required={field.required}
          value={formData[field.name] || ''}
          onChange={handleChange}
        />
      )}
    </div>
  ))}
  <button type="submit" className="btn btn-primary btn-sm">Submit</button>
</form>

    </div>
  );
}

export default Bengaluru;
