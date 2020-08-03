"use strict"

const express = require('express');
const router = express.Router();
const urlService = require('../services/urlService');

//Generate new shorter url
router.post('/', (req, res, next) => {
    urlService.generateNewShortUrl(req.body).then(data => {
        res.status(data.status).send({message: data.message, data: data.data});
    }).catch(error => {
        next(error);
    });
});

module.exports = router;