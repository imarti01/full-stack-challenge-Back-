const express = require('express');
const cors = require('cors');
const { connectDb } = require('./db/config');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const userRoutes = require('./routes/userRoutes');
const gifsRoutes = require('./routes/gifsRoutes');

const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  })
);

app.use('/user', userRoutes);
app.use('/gifs', gifsRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5000}`);
});
