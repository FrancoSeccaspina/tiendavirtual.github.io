const { body, check } = require('express-validator');
const { compareSync } = require('bcryptjs');
const db = require('../database/models/index');
const { nextTick } = require('process');
const { cp } = require('fs');

let email = body('email').notEmpty().withMessage('Emial no puede quedar vacio').bail().isEmail().withMessage('Email no valido').bail()
let password = body('password').notEmpty().withMessage('Por favor, ingrese su contraseña').bail()

module.exports = [
    
    body('email').custom(value => {
        return db.user.findOne({
            where:{
                email:value
            }
        }).then(user => {

            if(!user){
                return Promise.reject('Este email no esta registrado');
            }else{
                return true
            }
        });
    }),
    body('password').notEmpty().withMessage('La contraseña no puede quedar vacia').bail().custom(function(user, { req }){
        return db.user.findOne({
            where:{
                email: req.body.email
            }
        }).then(function(data){

            if(data){

                if(compareSync(req.body.password, data.password)){
                    return true
                }else{
                    return Promise.reject('Las contrseñas no coinciden')
                }
            }
        })
    }).withMessage('La contrseña no coincide')
]