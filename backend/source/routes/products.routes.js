const express = require('express');
const productsController = require('../controllers/products.controllerDB');
const route = express.Router();
//IMPLEMENTACION DE MULTER
const { resolve, extname } = require('path');

//Verificar que exista la carpeta cons existSync y si no existe la crea
const { existsSync, mkdirSync } = require('fs');

const destination = function(req, file, cb){
    let folder = resolve(__dirname, '..', '..', 'public', 'images');

    if(!existsSync(folder)){
        mkdirSync(folder)
    }
    return cb(null, folder);
}

const filename = function(req, file, cb){
    let unique = Date.now();
    let name = file.originalname;
    return cb(null, name);
}

const multer = require('multer');
const upload = multer({ storage:multer.diskStorage({ destination, filename })});

const isLogged  = require('../middlewares/isLogged');
const isAdmin = require('../middlewares/isAdmin');
const isProduct = require('../validations/productCreate');
const isProductEdit = require('../validations/productEdit');

route.get('/products/create', isLogged, isAdmin, productsController.create);

route.post('/products/guardar', upload.any(), isLogged, isProduct, productsController.save);

route.get('/products/:categoria?', productsController.index);
route.get('/products/detail/:id', productsController.show);
route.get('/products/:id', isLogged, isAdmin, productsController.show);
route.get('/products/edit/:id', isLogged, isAdmin, productsController.edit);

route.put('/products/actualizar/:id', isLogged, isAdmin, upload.any(), isProductEdit, productsController.update);

route.delete('/products/delete/:id', isLogged, isAdmin, productsController.remove);

route.get('/', productsController.index);

module.exports = route;