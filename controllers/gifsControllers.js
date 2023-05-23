const jwt = require('jsonwebtoken');
const { uploadImage } = require('../cloudinary/cloudinary');
require('dotenv').config();
const Gif = require('../models/Gif');

const addGif = async (req, res) => {
  const token = req.headers['x-token'];
  const { title, url, tags } = req.body;

  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    let tagsArr = [];
    if (tags.length > 0) tagsArr = tags.split(',');
    const newGif = await new Gif({
      title,
      tags: tagsArr,
      url,
      userId: id,
    });
    if (url === '') {
      const resultToUpload = await uploadImage(req.files.file.tempFilePath);
      newGif.url = resultToUpload.secure_url;
    }
    await newGif.save();
    return res.status(200).json({
      ok: true,
      newGif,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: 'Something happened',
    });
  }
};

module.exports = {
  addGif,
};
