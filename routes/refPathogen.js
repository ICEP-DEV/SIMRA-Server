const express = require('express');
const connection = require("../config/config");
const router = express.Router();

// Get a list of all reference pathogens

router.get('/referencepathogen', (req, res) => {
    connection.query('SELECT * FROM referencepathogen', (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    });
  });
   
  module.exports = router