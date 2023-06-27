const { body } = require('express-validator');
const { all } = require('../models/products.model');
const whilelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
]

let nombre = body('name').notEmpty().withMessage("El titulo no puede quedar vacio").isLength({ min:5 }).withMessage('El nombre debe contener al menos 5 caracteres')
let price = body('price').notEmpty().withMessage("El precio no puede quedar vacio")
let description = body('description').notEmpty().withMessage("La descripcion no puede quedar vacia").isLength({ min:20 }).withMessage("La descripcion debe contener al menos 20 caracteres")

let imagen = body('image').custom(function(value, { req }){

    if(req.files && req.files.length > 0 && whilelist.includes(req.files[0].mimetype)){
        return Promise.reject('Por favor el archivo debe ser jpg, png, jpeg o webp')
    }else{
        return true
    }
})
module.exports = [imagen, nombre, description, price]