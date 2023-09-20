const express = require('express');
const connection = require("../config/config");
const router = express.Router();

// Get a list of all provinces
router.get('/provinces', (req, res) => {
    connection.query('SELECT * FROM province', (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    });
  });
   
  module.exports = router