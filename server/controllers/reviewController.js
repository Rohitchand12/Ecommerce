const Review = require("../models/review.model")

exports.get_all_reviews = async(req,res)=>{
    const reviews = await Review.find();
    res.status(200).json({
        success:true,
        data:{
            reviews
        }
    })
}

exports.create_review = async(req,res)=>{
    const newReview = await Review.create(req.body);
    res.status(200).json({
        success:true,
        data:{
            newReview
        }
    })
}