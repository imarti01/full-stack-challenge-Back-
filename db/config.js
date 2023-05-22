const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Something happened with DB connection');
  }
};

module.exports = {
  connectDb,
};
