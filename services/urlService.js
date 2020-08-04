"use strict"

const {URL, validateUrl} = require('../models/urls');
const {nanoid} = require('nanoid');

const urlService = function(){
    this.generateNewShortUrl = (data) => {
        return new Promise((resolve, reject) => {
            const {error} = validateUrl(data); //Validate url data
            if (error) {
                reject({status: 500, message: error.message});
            }else{
                if(!data.slug){
                    data.slug = nanoid();
                }
                data.slug = data.slug.toLowerCase();
                //Save url data
                const newUrl = new URL({
                    slug: data.slug,
                    url: data.url
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

    this.findUrl = (url) => {
        return new Promise((resolve, reject) => {
            URL.findOne({url:url}).then( data => {
                if(!data){
                    reject({status:500, message: 'URL not found'});
                }else{
                    resolve({status:200, message: 'URL found', data: data})
                }
            }).catch(error => {
                reject({status:500, message: 'MongoDB error - ' + error});
            })
        });
    }
}

module.exports = new urlService();