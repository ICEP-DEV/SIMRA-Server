const express = require('express');
const connection = require("../config/config");
const router = express.Router();

// Get parameters for a specific pathogen
router.post('/QRMAlevel3', (req, res) => {
  const pathogenName = req.body.pathogenName;
  const e = 2.718;
  let pathogenResult = 0;
  let countestimate = 0;
  let mstdata_Id;

  // Define a function to fetch all data from FIBdata
  const callAveCount = (callback) => {
    const sqlQuery = 'SELECT count_estimate, mstdata_id FROM mst_maker ORDER BY mstdata_id DESC LIMIT 1'; // Modify the query to retrieve the latest entry by user_id
    //const userId = req.user.id; // Replace 'user_id' with the actual user identifier
    connection.query(sqlQuery, (err, rows) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        return callback(err, null);
      }

      if (rows.length > 0) {
        countestimate  = parseInt(rows[0].count_estimate);
        mstdata_Id = parseInt(rows[0].mstdata_id);
      }

      callback(null, countestimate , mstdata_Id);
    });
  };

  // Call the function to fetch mstdata_Id and count_estimate
  callAveCount((err, countestimate , mstdata_Id) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve data from the database' });
    }

    let alpha, beta, r, k, NFifty;
    switch (pathogenName) {
      case "Cryptosporidium parvum":
        r = 0.059;
        pathogenResult = 1 - Math.pow(e, -r * countestimate );
        break;
      case "E. coli O157:H7":
        alpha = 0.4;
        beta = 54.9;
        pathogenResult = 1 - Math.pow((1 + countestimate  / beta), -alpha);
        break;
      case "Campylobacter jejuni":
        alpha = 0.145;
        beta = 7.58;
        pathogenResult = 1 - Math.pow((1 + countestimate  / beta), -alpha);
        break;
      case "Salmonella typhi":
        alpha = 0.21;
        beta = 49.78;
        pathogenResult = 1 - Math.pow((1 + countestimate  / beta), -alpha);
        break;
      case "S. Flexneri":
        alpha = 0.256;
        beta = 1480;
        pathogenResult = 1 - Math.pow((1 + countestimate  / beta), -alpha);
        break;
      case "Vibrio cholera":
        alpha = 0.169;
        beta = 2305;
        pathogenResult = 1 - Math.pow((1 + countestimate  / beta), -alpha);
        break;
      case "Giardia lamblia":
        k = 0.0199;
        pathogenResult = 1 - Math.pow(e, -k * countestimate );
        break;
      case "Entamoeba coli":
        alpha = 0.101;
        NFifty = 341;
        pathogenResult = -((1 + countestimate  / NFifty) * Math.pow(2, 1) / 0.101);
        break;
      default:
        alpha = req.body.alpha;
    }

    pathogenResult = Math.round(pathogenResult * 100) / 100;

    const insertSql = 'INSERT INTO parameters (alpha, beta, r, k, NFifty, pathogenName, indicatorid, pathogenResult) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const insertBody = [
      alpha,
      beta,
      r,
      k,
      NFifty,
      pathogenName,
      mstdata_Id,
      pathogenResult,
    ];

    connection.query(insertSql, insertBody, (err, results) => {
      if (err) {
        console.error('Error inserting pathogen:', err);
        return res.status(500).json({ error: 'Error inserting pathogen' });
      }

      console.log('Pathogen inserted successfully:', results);
      res.status(201).send({ message: 'Pathogen added successfully', results });
    });
  });
});

module.exports = router;
