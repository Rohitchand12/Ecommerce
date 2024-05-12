const Product = require("../models/product.model")

exports.getAllProducts = async(req,res)=>{
    const products = await Product.find().populate('reviews');
    res.status(200).json({
        success:true,
        data:{
            products
        }
    })
}
exports.getProduct = (req,res)=>{
    res.status(200).json({
        success:true,
        message:'get product route'
    })
}

//ADMIN ROUTES

exports.updateProduct = (req,res)=>{
    res.status(200).json({
        success:true,
        message:'update product route'
    })
}
exports.postProduct = async(req,res)=>{
    const newProduct = await Product.create(req.body);
    res.status(200).json({
        success:true,
        data:{
            product: newProduct
        }
    })
}
exports.deleteProduct = (req,res)=>{
    res.status(200).json({
        success:true,
        message:'delete product route'
    })
}