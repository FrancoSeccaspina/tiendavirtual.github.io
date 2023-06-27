const { body } = require('express-validator');
let db = require('../database/models/index');

let email = body('email').notEmpty().withMessage("Email no puede quedar vacio").bail().isEmail().custom(function(user, { req }){
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
}).withMessage('Email ya registrado')

let password = body('password').notEmpty().withMessage('Por favor, ingrese una contraseña').bail().isLength({ min: 10 }).withMessage('Al menos 10 caracteres')
let user = body('user').notEmpty().withMessage('El nombre no puede quedar vacio').custom(function(user){
    return db.user.findOne({
        where:{
            user: user
        }
    }).then(function(data){

        if(data){
            throw new Error('Used user')
        }else{
            return true
        }
    })
}).withMessage('Usuario ya registrado').bail().isLength({ min: 5, max: 20 }).withMessage('Minimo 5 y maximo de 20 caracteres')

let fullName = body('fullName').notEmpty().withMessage('El nombre de usuario no puede quedar vacio').custom(function(user){
    return db.user.findOne({
        where:{
            user:user
        }
    }).then(function(data){

        if(data){
            throw new Error('Used user')
        }else{
            return true
        }
    })
}).withMessage('Usuario ya registrado').bail().isLength({  min: 4 })

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

let validaciones = [email, password, user, fullName, imagen]

module.exports = validaciones;