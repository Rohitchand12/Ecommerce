const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:[true,'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'rating is required']
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:[true,'review must belong to a product']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'review must belong to a user']
    }
},{timestamps:true})


//query Middlewares

reviewSchema.pre(/^find/ , function(){
    this.populate({
        path:'product',
        select:'title description'
    }).populate({
        path:'user',
        select:'name image'
    })
})

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;