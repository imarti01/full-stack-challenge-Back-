const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const { addGif } = require('../controllers/gifsControllers');

const router = express.Router();

router.post('/addGif', checkJWT, addGif);

module.exports = router;
