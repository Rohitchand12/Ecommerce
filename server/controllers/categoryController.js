import Product from "../models/product.model.js"
import asyncHandler from "../utils/asyncHandler.js"

export const showCategories = asyncHandler(async(req,res)=>{
    const products = await Product.aggregate([
        {
            $group:{
                _id:"$category",
                nProducts : {$sum : 1}
            }
        }
    ])

    res.status(200).json({
        success:true,
        products
    })
})

export const getItemsFromCategory = asyncHandler(async(req,res) => {
    
})