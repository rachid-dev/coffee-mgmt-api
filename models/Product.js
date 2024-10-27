const mongoose = require('mongoose')
const muv = require('mongoose-unique-validator')

const productSchema = mongoose.Schema({
    name : {type : String, required : true},
    description : {type : String},
    picture : {type : String, required : true},
    price : {type : Number, required : true},
})

productSchema.plugin(muv)

module.exports = mongoose.model('Product', productSchema)