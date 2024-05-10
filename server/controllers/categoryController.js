const Category = require('../models/category.model')

exports.get_all_categories=async(req,res)=>{
    const allCategories = await Category.find();
    res.status(200).json({
        sucess:true,
        data:{
            categories : allCategories
        }
    })
}
exports.add_category = async(req,res)=>{
    const newCategory = await Category.create(req.body);
    res.status(200).json({
        sucess:true,
        data:{
            category:newCategory
        }
    })
}