require("dotenv").config();

const express = require('express');

const app = express();
const connectDB = require('./connection/connection');

connectDB();

app.get('/', (req, res)=>{
  res.send('GET request received');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});