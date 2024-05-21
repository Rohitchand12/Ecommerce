import { default as mongoose } from "mongoose";
import Product from "./product.model.js";
import AppError from "../utils/appError.js";

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "review is required"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "rating is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "review must belong to a product"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "review must belong to a user"],
    },
  },
  { timestamps: true }
);

//static functions
reviewSchema.statics.calcAvgRatings = async function (productId) {
  //this points to model
  //building aggregation pipeline to calculate stats
  const stats = await this.aggregate([
    {
      $match: { product: productId }, // matching all reviews with product id
    },
    {
      $group: {
        // grouping all reviews with product property of their schema
        _id: "$product",
        nRatings: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  // update the product when stats are calculated
  await Product.findByIdAndUpdate(productId, {
    ratingsAverage: stats[0].avgRating,
    ratingsQuantity: stats[0].nRatings,
  });
};
//query Middlewares

//calculate stats after a new review is saved
reviewSchema.post("save", function () {
  //this points to current review document
  this.constructor.calcAvgRatings(this.product); // this.constructor points to model
});

//calculate stats after a review is updated
reviewSchema.post(/^findOneAnd/, async function (doc, next) {
    console.log(doc);
  if (!doc) return next(new AppError("Invalid review or user ", 400));
  await doc.constructor.calcAvgRatings(doc.product._id);
  next();
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "title description",
  }).populate({
    path: "user",
    select: "name image",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
