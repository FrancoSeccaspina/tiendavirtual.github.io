const fs = require('fs');
const { unlinkSync } = require('fs');
const { resolve } = require('path');
const path = require('path');
const { all, one, generate, write } = require('../models/products.model');

const controlador = {

    index: (req,res) => {
        let products = all();
        const inOffer = products.filter(product => product.inOffer == 1);
        const almacen = products.filter(product => product.category == 'Almacen');
        const bebida  = products.filter(product => product.category == 'Bebida');
        const hogar   = products.filter(product => product.category == 'Hogar');
        const perfumeria = products.filter(product => product.category == 'Perfumeria');

        return res.render('home', { products, inOffer, almacen, bebida, hogar, perfumeria})
    },

    show: (req,res) => {
        let product = one(req.params.sku)
        
        if(product){
            return res.render('productDetail', { product });
        }
        res.render('productDetail' + { product:null })
    },
        
    create: (req,res) => {
        return res.render('create')
    },
      
    save: (req,res) => {

        req.body.image = req.files && req.files.length > 0 ? req.files[0].filename: 'defualt.png'
        
        let datosDelForm = req.body; 
        let nuevo = generate(req.body);
        let todos = all();
        write(todos);
        return res.redirect('/')
    },
        
    edit: (req,res) => {
        let product = one(req.params.sku);

        return res.render('edit', { product })
    },

    update: (req,res) => {
        let todos = all();
        let actualidos = todos.map(elemento =>{
            if(elemento.sku == req.body.sku){
                elemento.name == req.body.name;
                elemento.description == req.body.description;
                elemento.price == req.body.price;
                elemento.category == req.body.category;
                elemento.inOffer == req.body.inOffer;
                elemento.image = elemento.image == req.body.image ? req.body.image : elemento.image;
            }
            return elemento;
        })   

        write(actualidos);
        return res.redirect('/')

    },

    remove: (req,res) => {

        let product = one(req.body.sku);
        
        let todos = all();
        let noEliminar = todos.filter(elemento => elemento.sku != req.body.sku);
        write(noEliminar);
        
        return res.redirect('/')
    }
}

module.exports = controlador;