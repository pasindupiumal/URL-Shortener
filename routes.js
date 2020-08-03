"use strict"

const express = require('express');
const router = express.Router();
const urlController = require('./controllers/urlController');

router.use('/urls', urlController);

module.exports = router;