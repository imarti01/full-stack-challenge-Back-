const jwt = require('jsonwebtoken');
const { uploadImage } = require('../cloudinary/cloudinary');
require('dotenv').config();
const Gif = require('../models/Gif');
const fs = require('fs-extra');

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
      await fs.unlink(req.files.file.tempFilePath);
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

const getAllUserGifs = async (req, res) => {
  const token = req.headers['x-token'];
  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userGifs = await Gif.find({ userId: id });
    return res.status(200).json({
      ok: true,
      userGifs,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: 'Something happened',
    });
  }
};

const editGif = async (req, res) => {
  try {
    await Gif.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: 'Something happened',
    });
  }
};

const deleteGif = async (req, res) => {
  const { gifId } = req.params;
  try {
    await Gif.findByIdAndDelete(gifId);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: 'Something happened',
    });
  }
};

const getGifsByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const tagResults = await Gif.find({ tags: { $in: tag } });
    return res.status(200).json({
      ok: true,
      tagResults,
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
  getAllUserGifs,
  editGif,
  deleteGif,
  getGifsByTag,
};
