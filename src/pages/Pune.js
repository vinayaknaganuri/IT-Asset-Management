import React, { useState } from 'react';

const fields = [
  { label: 'Employee ID', name: 'employeeId', required: true },
  { label: 'Employee Name', name: 'employeeName', required: true },
  { label: 'OS Name', name: 'os' },
  { label: 'System Name', name: 'systemName' },
  { label: 'System Model', name: 'model' },
  { label: 'Processor', name: 'processor' },
  { label: 'RAM', name: 'ram' },
  { label: 'Storage', name: 'storage' },
  { label: 'Adapter Type', name: 'adapterType' },
  { label: 'Adapter Serial Number', name: 'adapterSerial' },
  { label: 'Mouse Type', name: 'mouseType' },
  { label: 'Mouse Serial Number', name: 'mouseSerial' },
  { label: 'Headset Type', name: 'headsetType' },
  { label: 'Headset Serial Number', name: 'headsetSerial' },
  { label: 'Bag', name: 'bag' },
  { label: 'Assigned Date', name: 'date', type: 'date', required: true },
];

function Pune() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    // You can send this data to an API or process it further
  };

  return (
    <div className="container">
      <h2 className="mt-5">Pune Assets</h2>
      <p>Here you can register or manage Pune assets.</p>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type="text"
              className="form-control"
              name={field.name}
              required={field.required}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="submite btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Pune;
