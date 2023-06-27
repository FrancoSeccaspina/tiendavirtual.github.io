const { body } = require('express-validator');
let db = require('../database/models/index');

let email = body('email').notEmpty().withMessage('Email no puede quedar vacio').bail().isEmail().custom(function(user, { req }){
    return db.user.findOne({
        where:{
            email: req.body.email
        }
    }).then(function(data){

        if(data){
            return Promise.reject('Used email')
        }else{
            return true
        }
    })
}).withMessage('Email ya se encuentra registrado')

let password = body('password').notEmpty().withMessage('Por favor, ingrese una contraseña').bail().isLength({ min: 10 }).withMessage('Debe contener al menos 10 caracteres')
let user = body('user').notEmpty().withMessage('El nombre de usuario no puede quedar vacio').isLength({ min: 2, max: 20}).withMessage('Minimo 2 carateres y maximo 20')
let fulName = body('fullName').notEmpty().withMessage('El nombre de usuario no puede quedar vacio').isLength({ min: 2 }).withMessage('Al menos debe contener 2 caracteres')

const whilelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
]

let imagen = body('image').custom(function(value, { req }){

    if(req.files && req.files.length > 0 && !whilelist.includes(req.files[0].mimetype)){
        return Promise.reject('Por favor el archivo debe ser jpg, png, jpeg o webp')
    }else{
        return true
    }
})

let validaciones = [email, user, fulName, imagen]

module.exports = validaciones;