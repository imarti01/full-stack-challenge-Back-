const express = require('express');
const {
  createUser,
  loginWithToken,
  loginUser,
} = require('../controllers/userControllers');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/isLogged', loginWithToken);

module.exports = router;
