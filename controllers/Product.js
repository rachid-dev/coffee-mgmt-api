const Product = require('../models/Product')
const fs = require('fs');
const formParser = require('../configurations/formidable.config')




exports.getProducts =(req,res) => {

    Product.find()
        .then( products => res.status(200).json(products) )
        .catch( error => res.status(404).json({error}) )

}

exports.getProduct =(req, res) => {
    Product.findOne({_id : req.params.id})
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({ error }))
}


exports.createProduct = (req, res, next)=>{

    formParser.parse(req, (err, fields, files) => {
        const product = new Product({
            ...JSON.parse(fields.product),
            picture : `${req.protocol}://${req.headers.host}/assets/${files.image.newFilename}`
        });

        product.save()
        .then(() => res.status(201).json({message : 'Product Successfully created'}))
        .catch(error => res.status(500).json({error}) );

    })
   
}

exports.updateProduct =  (req, res, next)=>{

   formParser.parse(req, (err, fields, files) => {
        
        product = files.image ? ({
            ...JSON.parse(fields.product),
            picture : `${req.protocol}://${req.headers.host}/assets/${files.image.newFilename}`
        }) :(
            {
                ...JSON.parse(fields.product)
            }
        );

        Product.updateOne({_id : req.params.id},{...product, _id : req.params.id})
            .then(() => res.status(200).json({message : 'Product successfuly modified'}))
            .catch(error => res.status(500).json({error}))

    })
   
    
}


exports.deleteProduct = (req, res)=>{
   
    Product.findOne({_id : req.params.id})
    .then(product => {
        const filename = product.picture.split('assets')[1]
        fs.unlink(`public/assets/${filename}`, ()=>{
            Product.deleteOne({_id : req.params.id})
            .then(() => res.status(200).json({message : 'Product successfuly deleted'}))
            .catch(error => res.status(400).json({error}))
        })
    })
    .catch(error => res.status(500).json({error}))
    
}