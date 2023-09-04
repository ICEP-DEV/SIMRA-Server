require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Connection = require('./config/config')

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// Mount the user login route
app.use('/api', require('./routes/user'))


// Mount the user registration route
app.use('/api', require('./routes/registration'));

app.use('/', (req, res) =>{
    res.send('Endpoint Successfully')
})

// server listening to port 3000 inside .env file
app.listen(process.env.PORT, () => {
    console.log('Server started at port ' + process.env.PORT)
})