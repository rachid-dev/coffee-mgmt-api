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


exports.createProduct = async (req, res, next)=>{

    const [fields, files] = await formParser.parse(req);
    const product = new Product({
        ...JSON.parse(fields.product[0]),
        picture : `${req.protocol}://${req.headers.host}/assets/${files.image[0].newFilename}`
    });

    product.save()
    .then(() => res.status(201).json({message : 'Product Successfully created'}))
    .catch(error => res.status(500).json({error}) );

}

exports.updateProduct = async (req, res, next)=>{

   const [fields, files] = await formParser.parse(req);
   
   product = files.image[0] !== '' ? ({
       ...JSON.parse(fields.product[0]),
       picture : `${req.protocol}://${req.headers.host}/assets/${files.image[0].newFilename}`
   }) :(
       {
           ...JSON.parse(fields.product[0])
       }
   );
        
   Product.updateOne({_id : req.params.id},{...product, _id : req.params.id})
       .then(() => res.status(200).json({message : 'Product successfuly modified'}))
       .catch(error => res.status(500).json({error}))

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