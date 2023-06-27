const express = require('express');
const productsController = require('../../controllers/api/products,api.controller');
const route = express.Router();

const {resolve, extaname } = require('path');
const { existsSync, mkdirSync } = require('fs');

const destination = function(req, file, cb){
    let folder = resolve(__dirname, '..', '..', 'public', 'images');

    if(!existsSync(folder)){
        mkdirSync(folder)
    }
    return cb(null, folder);
}

route.get('/api/products', productsController.list);
route.get('/api/products/last', productsController.last);
route.get('/api/products/:id', productsController.detail);

module.exports = route;