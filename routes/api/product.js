const express = require('express');
// const connection = require('../../../utility/database')
const router = express.Router();

const Product = require('../../models/product') //Product Modeli

router.post('/', (req, res) => { //Create Operation
    const product = {
        name: req.body.name,
        price: req.body.price,
        imagaUrl: req.body.imagaUrl,
        description: req.body.description
    }
    Product.create(product).then(result => {
        console.log(result)
        res.send(result)
    })
})

router.get('/', (req, res) => { //Reads all data
    Product.findAll().then(result => {
        res.send(result)
    })
})

router.post('/edit', (req, res) => { //Update Operation
    const editedProduct = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        imagaUrl: req.body.imagaUrl,
        description: req.body.description
    }
    Product.findByPk(editedProduct.id).then(product => {    //Primary keye göre db'den veriyi getirir.
        product.name = editedProduct.name;
        product.price = editedProduct.price;
        product.imagaUrl = editedProduct.imagaUrl;
        product.description = editedProduct.description;
        return product.save()   //Veriyi günceller
    }).then(result => {
        res.send(result)
    })
})

router.delete('/:id', (req, res) => {
    Product.destroy({ where: { id: req.params.id } }).then(result => {
        res.sendStatus(202)
    })
})


module.exports = router;