const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateJWT = require('../helpers/generateJWT');

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
};

module.exports = {
  createUser,
};
