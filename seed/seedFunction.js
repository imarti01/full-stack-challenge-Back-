const mongoose = require('mongoose');

const Gif = require('../models/Gif');
const cats = require('./seedGifCats');
const funny = require('./seedGifFunny');
const best = require('./seedGifBest');
const laugh = require('./seedGifLaugh');

const seedFunction = async () => {
  try {
    const catsData = cats.data.map((gif) => {
      return {
        title: gif.title,
        url: gif.images.original.url,
        tags: ['cats'],
        userId: '646db878a9010ef78636a909',
      };
    });

    await Gif.insertMany(catsData);

    const funnyData = funny.data.map((gif) => {
      return {
        title: gif.title,
        url: gif.images.original.url,
        tags: ['funny'],
        userId: '646db878a9010ef78636a909',
      };
    });

    await Gif.insertMany(funnyData);

    const bestData = best.data.map((gif) => {
      return {
        title: gif.title,
        url: gif.images.original.url,
        tags: ['best'],
        userId: '646db878a9010ef78636a909',
      };
    });

    await Gif.insertMany(bestData);

    const laughData = laugh.data.map((gif) => {
      return {
        title: gif.title,
        url: gif.images.original.url,
        tags: ['laugh'],
        userId: '646db878a9010ef78636a909',
      };
    });

    await Gif.insertMany(laughData);

    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding the database:', err);
    mongoose.disconnect();
  }
};

module.exports = seedFunction;
