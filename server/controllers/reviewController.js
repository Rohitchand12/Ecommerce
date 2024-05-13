const Review = require("../models/review.model")
const asyncHandler = require("../utils/asyncHandler")

exports.get_all_reviews = asyncHandler(async(req,res)=>{
    const reviews = await Review.find();
    res.status(200).json({
        success:true,
        data:{
            reviews
        }
    })
})

exports.create_review = asyncHandler(async(req,res)=>{
    const newReview = await Review.create(req.body);
    res.status(200).json({
        success:true,
        data:{
            newReview
        }
    })
})