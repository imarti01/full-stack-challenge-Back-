const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
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
    const employee = await Employee.findById(id);

    if (!employee) {
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
