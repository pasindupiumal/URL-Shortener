"use strict"

const mongoose = require('mongoose');
const joi = require('joi');
const schema = mongoose.Schema;

const urlSchema = new schema({
    slug: String,
    url: {
        type: String,
        required: true
    }
});

function validateUrl(url){
    const urlValidationSchema = joi.object({
        slug: joi.string().trim().regex(/[\w\-]/i),
        url: joi.string().trim().uri().required()
    });
    return urlValidationSchema.validate(url);
}

const URL = mongoose.model('URL', urlSchema);

module.exports.URL = URL;
module.exports.validateUrl = validateUrl;