const express = require('express');
const usersController = require('../controllers/users.controllerDB');
const route = express.Router();

const { resolve, extname } = require('express');
const { existsSync, mkdirSync } = require('fs');

const destination = function(req, file, cb){
    let folder = (__dirname, '..', '..', ' public', 'images', 'avatars');

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

const registerValildator = require('../validations/register');
const editarValidator = require('../validations/userEdit');
const loginValidator = require('../validations/login');

const isLogged = require('../middlewares/isLogged');
const isAdmin = require('../middlewares/isAdmin');

route.get('/register', usersController.create);

route.post('/register/save', upload.any(), registerValildator, usersController.save);

route.get('/login', usersController.login);

route.post('/login/access', loginValidator, usersController.access);

route.get('/logOut', isLogged, usersController.logout);
route.get('/users/detail/:id', isLogged, usersController.show);

route.put('/users/:id', isLogged, usersController.show);

route.get('/users/edit/:id', isLogged, usersController.edit);

route.put('/users/update/:id', isLogged, isAdmin, upload.any(), editarValidator, usersController.update);

route.get('/users/update', isLogged, usersController.update);
route.get('/users', isLogged, isAdmin, usersController.index);

module.exports = route;