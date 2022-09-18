const express = require('express')
const router = express.Router()
const spotifyController = require('../controllers/Token')

router.get('/login', spotifyController.login);
router.get('/auth', spotifyController.jwt, spotifyController.auth);
router.get('/status', spotifyController.jwt, spotifyController.status);
router.get('/search', spotifyController.jwt, spotifyController.search);

module.exports = router