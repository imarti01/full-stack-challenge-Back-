const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const {
  addGif,
  getAllUserGifs,
  editGif,
  deleteGif,
  getGifsByTag,
  getGifsByQuery,
  getLastUploadedGifs,
} = require('../controllers/gifsControllers');
const seedFunction = require('../seed/seedFunction');

const router = express.Router();

router.post('/addGif', checkJWT, addGif);
router.get('/getAllUserGifs', checkJWT, getAllUserGifs);
router.post('/editGif', checkJWT, editGif);
router.delete('/deleteGif/:gifId', checkJWT, deleteGif);

router.get('/getByTag/:tag', getGifsByTag);
router.get('/getByQuery/:query', getGifsByQuery);
router.get('/getLastGifs', getLastUploadedGifs);

router.get('/seed', seedFunction);

module.exports = router;
