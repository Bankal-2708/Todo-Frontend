require("dotenv").config();

const express = require('express');
const cors = require("cors");

const app = express();
const connectDB = require('./connection/connection');
const auth = require('./routes/auth');
const list = require('./routes/list');


connectDB();

app.use(express.json());
app.use(cors());
app.get('/', (req, res)=>{
  res.send('GET request received');
})


app.use("/api/v1", auth);
app.use("/api/v2", list);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});