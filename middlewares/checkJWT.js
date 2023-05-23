const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const checkJWT = async (req, res, next) => {
  const token = req.headers['x-token'];

  if (!token) {
    return res
      .status(401)
      .json({ ok: false, msg: 'Missing token in the request' });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ ok: false, msg: 'Invalid token' });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Token is not valid',
    });
  }
};

module.exports = checkJWT;
