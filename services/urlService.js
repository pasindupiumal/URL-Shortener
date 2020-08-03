"use strict"

const {URL, validateUrl} = require('../models/urls');
const {nanoid} = require('nanoid');

const UrlService = function(){
    this.generateNewShortUrl = (url) => {
        return new Promise((resolve, reject) => {
            const {error} = validateUrl(url); //Validate url data
            if (error) {
                reject({status: 500, message: 'Url validation error\n ' + error.details[0]});
            }else{
                if(!url.slug){
                    url.slug = nanoid();
                }
                url.slug = url.slug.toLowerCase();
                //Save url data
                const newUrl = new URL({
                    slug: url.slug,
                    url: url.url
                });
                newUrl.save().then(() => {
                    resolve({status: 200, message: 'New url added', data: newUrl});
                }).catch(error => {
                    reject({status: 500, message: 'Database operation error\n' + error});
                });            
            }
        });
    }
}

module.exports = new UrlService();