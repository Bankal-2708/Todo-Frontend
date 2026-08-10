require("dotenv").config();

const express = require('express');

const app = express();
const connectDB = require('./connection/connection');
const auth = require('./routes/auth');


connectDB();

app.use(express.json());
app.get('/', (req, res)=>{
  res.send('GET request received');
})


app.use("/api/v1", auth);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});