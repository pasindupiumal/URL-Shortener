"use strict"

const express = require('express');
const router = express.Router();

//Generate new shorter url
router.post('/', (req, res) => {

    res.send('URL controller');
});

module.exports = router;