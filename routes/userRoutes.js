const express = require('express');
const {
  createUser,
  loginWithToken,
} = require('../controllers/userControllers');

const router = express.Router();

router.post('/register', createUser);
router.get('/isLogged', loginWithToken);

module.exports = router;
