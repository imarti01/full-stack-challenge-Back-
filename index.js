const express = require('express');
const cors = require('cors');
const { connectDb } = require('./db/config');
require('dotenv').config();

const app = express();

connectDb();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5000}`);
});
