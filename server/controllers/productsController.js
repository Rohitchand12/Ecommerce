exports.getAllProducts = (req,res)=>{
    res.status(200).json({
        success:true,
        message:'all products route'
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
exports.postProduct = (req,res)=>{
    res.status(200).json({
        success:true,
        message:'post product route'
    })
}
exports.deleteProduct = (req,res)=>{
    res.status(200).json({
        success:true,
        message:'delete product route'
    })
}