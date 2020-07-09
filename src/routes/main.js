const express = require('express');

const mainController = require('../controllers/main');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET on localhost:port/
router.get('/', isAuth, mainController.get);

module.exports = router;