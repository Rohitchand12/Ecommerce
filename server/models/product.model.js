const mongoose = require('mongoose');
const validator = require('validator');
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Product title is required'],
        // validate: [validator.isAlphanumeric , 'Title should contains only alphabets and digits'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Please add product description'],
        trim:true
    },
    images:{
        type:[String]
    },
    brand:{
        type:String,
        required:[true,'Brand is required'],
        trim:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:[true,'Product category is required'],
        trim:true
    },
    color:{
        type:String,
        trim:true
    }

},{timestamps:true});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;