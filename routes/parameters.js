const express = require('express');
const connection = require("../config/config");
const router = express.Router();
 
  
  
 // Get municipalities within a specific province
  router.get('/parameters/:pathogenid', (req, res) => {
    const pathogen_Id = req.params.pathogenid;
    console.log(req.params.pathogenid);
    const query = 'SELECT * FROM parameters WHERE pathogenid= ?';
    connection.query(query, pathogen_Id, (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    });
  });
  module.exports = router