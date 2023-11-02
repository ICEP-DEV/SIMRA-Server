const express = require('express');
const connection = require("../config/config");
const router = express.Router();

// Initialize model as null
let model = null;


router.post('/referencepathogen', (req, res) => {
  // Check if pathogenName is provided in the request body
  if (!req.body.pathogenName) {
    return res.status(400).json({ error: 'pathogenName is required' });
  }

    // Set the model based on the pathogenName
    switch (req.body.pathogenName) {
      case "Cryptosporidium parvum":
        model = 'exponential';
        break;
      case "E. coli O157:H7":
      case "Campylobacter jejuni":
      case "Salmonella typhi":
      case "S. Flexneri":
      case "Vibrio cholera":
        model = 'beter-poisson';
        break;
      case "Giardia lambia":
        model = 'beter-poisson';
        break;
      case "Entamoeba col":
        model = 'exponential';
        break;
      default:
        console.log('Select a valid pathogen');
        return res.status(400).json({ error: 'Invalid pathogen' });
    }

    const PrSql = 'INSERT INTO referencepathogen (pathogenName, model) VALUES (?, ?)';

    connection.query(PrSql, [req.body.pathogenName, model], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(rows);
    });
});

module.exports = router;
