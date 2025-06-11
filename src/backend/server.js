const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'sql5.freesqldatabase.com',
  user: process.env.DB_USER || 'sql5784164',
  password: process.env.DB_PASS || 'P3KdBITzgI',
  database: process.env.DB_NAME || 'sql5784164',
  port: process.env.DB_PORT || 3306
});

// Connect to DB
db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});


// ===== Bengaluru Assets APIs =====

// Get all Bengaluru assets
app.get('/api/assets/bengaluru', (req, res) => {
  db.query('SELECT * FROM bengaluru_assets', (err, results) => {
    if (err) {
      console.error('❌ Error fetching Bengaluru assets:', err);
      return res.status(500).json({ error: 'Error fetching Bengaluru assets' });
    }
    res.json(results);
  });
});

// Add Bengaluru asset
app.post('/api/assets/bengaluru', (req, res) => {
  const {
    employeeId, employeeName, os, systemName, model, processor, ram, storage,
    adapterType, adapterSerial, mouseType, mouseSerial,
    headsetType, headsetSerial, bag, location, assignedDate,
  } = req.body;

  const query = `
    INSERT INTO bengaluru_assets (
      employeeId, employeeName, os, systemName, model, processor, ram, storage,
      adapterType, adapterSerial, mouseType, mouseSerial,
      headsetType, headsetSerial, bag, location, assignedDate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    employeeId, employeeName, os, systemName, model, processor, ram, storage,
    adapterType, adapterSerial, mouseType, mouseSerial,
    headsetType, headsetSerial, bag, location, assignedDate,
  ];

  db.query(query, values, err => {
    if (err) {
      console.error('❌ Error inserting Bengaluru asset:', err);
      return res.status(500).json({ error: 'Error inserting Bengaluru asset' });
    }
    res.status(201).json({ message: '✅ Bengaluru asset added successfully' });
  });
});

// Delete Bengaluru asset
app.delete('/api/assets/bengaluru/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM bengaluru_assets WHERE id = ?', [id], err => {
    if (err) {
      console.error('❌ Error deleting Bengaluru asset:', err);
      return res.status(500).json({ error: 'Error deleting Bengaluru asset' });
    }
    res.json({ message: '✅ Bengaluru asset deleted successfully' });
  });
});


// ===== Returned Assets APIs =====

// Get all returned assets
app.get('/api/assets/return', (req, res) => {
  db.query('SELECT * FROM returned_assets', (err, results) => {
    if (err) {
      console.error('❌ Error fetching returned assets:', err);
      return res.status(500).json({ error: 'Error fetching returned assets' });
    }
    res.json(results);
  });
});

// Add returned asset
app.post('/api/assets/return', (req, res) => {
  const {
    employeeId, employeeName, os, systemName, model, processor, ram, storage,
    adapterType, adapterSerial, mouseType, mouseSerial,
    headsetType, headsetSerial, bag, location, returnDate,
  } = req.body;

  const query = `
    INSERT INTO returned_assets (
      employeeId, employeeName, os, systemName, model, processor, ram, storage,
      adapterType, adapterSerial, mouseType, mouseSerial,
      headsetType, headsetSerial, bag, location, returnDate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    employeeId, employeeName, os, systemName, model, processor, ram, storage,
    adapterType, adapterSerial, mouseType, mouseSerial,
    headsetType, headsetSerial, bag, location, returnDate,
  ];

  db.query(query, values, err => {
    if (err) {
      console.error('❌ Error inserting returned asset:', err);
      return res.status(500).json({ error: 'Error inserting returned asset' });
    }
    res.status(201).json({ message: '✅ Returned asset recorded successfully' });
  });
});

// DELETE an asset by ID
app.delete('/api/assets/return/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM returned_assets WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting asset:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json({ message: 'Asset deleted successfully' });
  });
});

// ===== LaptopDB APIs =====

// Get all laptops
app.get('/api/laptops', (req, res) => {
  db.query('SELECT * FROM laptopDB', (err, results) => {
    if (err) {
      console.error('❌ Error fetching laptops:', err);
      return res.status(500).json({ error: 'Error fetching laptops' });
    }
    res.json(results);
  });
});

// Add laptop
app.post('/api/laptops', (req, res) => {
  const { os, systemName, model, processor, ram, storage } = req.body;

  const query = `
    INSERT INTO laptopDB (os, systemName, model, processor, ram, storage)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [os, systemName, model, processor, ram, storage], err => {
    if (err) {
      console.error('❌ Error inserting laptop:', err);
      return res.status(500).json({ error: 'Error inserting laptop' });
    }
    res.status(201).json({ message: '✅ Laptop added successfully' });
  });
});

// Delete laptop
app.delete('/api/laptops/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM laptopDB WHERE id = ?', [id], err => {
    if (err) {
      console.error('❌ Error deleting laptop:', err);
      return res.status(500).json({ error: 'Error deleting laptop' });
    }
    res.json({ message: '✅ Laptop deleted successfully' });
  });
});


// ===== Stock Devices APIs =====

// ✅ Get all stock devices (added for frontend)
app.get('/api/stock-devices', (req, res) => {
  db.query('SELECT * FROM stock_devices', (err, results) => {
    if (err) {
      console.error('❌ Error fetching stock devices:', err);
      return res.status(500).json({ error: 'Error fetching stock devices' });
    }
    res.json(results);
  });
});

// Add stock device
app.post('/api/stock-devices', (req, res) => {
  const { type, name, barcode, location } = req.body;

  const query = `
    INSERT INTO stock_devices (deviceType, deviceName, barcode, location)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [type, name, barcode, location], err => {
    if (err) {
      console.error('❌ Error inserting stock device:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.status(201).json({ message: '✅ Device inserted successfully' });
  });
});

app.delete('/api/stock-devices/barcode/:barcode', (req, res) => {
  const { barcode } = req.params;
  const sql = 'DELETE FROM stock_devices WHERE barcode = ?';

  db.query(sql, [barcode], (err, result) => {
    if (err) {
      console.error('❌ Error deleting by barcode:', err);
      return res.status(500).json({ error: 'Database delete error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  });
});



// ===== Start Server =====
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
