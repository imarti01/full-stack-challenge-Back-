const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const { addGif, getAllUserGifs } = require('../controllers/gifsControllers');

const router = express.Router();

router.post('/addGif', checkJWT, addGif);
router.get('/getAllUserGifs', checkJWT, getAllUserGifs);

module.exports = router;
