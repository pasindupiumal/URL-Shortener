"use strict"

const {URL, validateUrl} = require('../models/urls');
const {nanoid} = require('nanoid');

const urlService = function(){
    this.generateNewShortUrl = (url) => {
        return new Promise((resolve, reject) => {
            const {error} = validateUrl(url); //Validate url data
            if (error) {
                reject({status: 500, message: error.message});
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
                    const result = {
                        slug: newUrl.slug,
                        url: newUrl.url
                    }
                    resolve({status: 200, message: 'New url added', data: result});
                }).catch(error => {
                    reject({status: 500, message: 'Database operation error\n' + error});
                });            
            }
        });
    }
}

module.exports = new urlService();