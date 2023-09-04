// for user registration functionality
const express = require('express');
const router = express.Router();
const mysql = require('mysql'); 


// Import the database connection configuration
const dbConfig = require('../config/config');
const connection = mysql.createConnection(dbConfig);

// POST /api/register - User registration route
router.post('/register', (req, res) => {
  const { mobileNo, password, firstname, lastname, level } = req.body;

  // Check if the mobile number is already registered
  const sql = `SELECT * FROM user WHERE mobileNo = ?`;
  connection.query(sql, [mobileNo], (err, Results) => {
    if (err) {
      console.error('Error during registration check:', err);
      return res.json({ message: 'Server error' });
    }

    if (Results.length > 0) {
      return res.json({ message: 'Mobile number is already registered' });
    }

    // Insert the registration data into the user table
    const insertQuery = `INSERT INTO user (mobileNo, password, firstname, lastname, level) VALUES (?, ?, ?, ?, ?)`;
    connection.query(insertQuery, [mobileNo, password, firstname, lastname, level], (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Error during registration:', insertErr);
        return res.json({ message: 'Server error' });
      }

      res.json({ message: 'User registered successfully' });
    });
  });
});

module.exports = router;



