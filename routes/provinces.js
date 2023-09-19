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
  
  /*// Get a list of all municipalities
  router.get('/municipality', (req, res) => {
    connection.query('SELECT * FROM municipality', (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    });
  });*/
  
 // Get municipalities within a specific province
  router.get('/provinces/:provinceId/municipalities', (req, res) => {
    const provinceId = req.params.provinceId;
    const query = 'SELECT * FROM municipality WHERE province_id = ?';
    connection.query(query, provinceId, (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    });
  });
  module.exports = router