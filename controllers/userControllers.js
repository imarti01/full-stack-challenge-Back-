const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateJWT = require('../helpers/generateJWT');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'A user already exists with this email',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    const token = await generateJWT(newUser._id);

    return res.status(200).json({
      ok: true,
      user: { token, username: newUser.username },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: 'Something happened',
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(503).json({
        ok: false,
        msg: 'User and password do not match',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(503).json({
        ok: false,
        msg: 'User and password do not match',
      });
    }

    const token = await generateJWT(user._id);

    return res.status(200).json({
      ok: true,
      user: { token, username: user.username },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: 'Something happened',
    });
  }
};

const loginWithToken = async (req, res) => {
  const token = req.headers['x-token'];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ ok: false, msg: 'Invalid token' });
    }
    return res.status(200).json({
      ok: true,
      username: user.username,
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
  createUser,
  loginWithToken,
  loginUser,
};
