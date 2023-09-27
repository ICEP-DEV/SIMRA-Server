const express = require('express');
const connection = require("../config/config");
const router = express.Router();
 
  
  
 // Get municipalities within a specific province
  router.get('/municipalities/:province_id', (req, res) => {
    const province_Id = req.params.province_id;
    console.log(req.params.province_id);
    const query = 'SELECT * FROM municipality WHERE province_id = ?';
    connection.query(query, province_Id, (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    });
  });
  module.exports = router