import Review from "../models/review.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const get_all_reviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json({
    success: true,
    data: {
      reviews,
    },
  });
});

export const create_review = asyncHandler(async (req, res) => {
  const { review, rating } = req.body;
  const reviewObject = {
    review,
    rating,
    product: req.params.productId,
    user: req.user._id,
  };

  const newReview = await Review.create(reviewObject);
  res.status(200).json({
    success: true,
    data: {
      newReview,
    },
  });
});

export const update_review = asyncHandler(async (req, res, next) => {
  // finding review by its id and checking if it belongs to logged in user
  const updatedReview = await Review.findOneAndUpdate(
    { _id: req.params.reviewId, user: req.user._id },
    req.body,
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: updatedReview,
  });
});

export const delete_review = asyncHandler(async (req, res, next) => {
  
  //find and delete review by id and user verification
  await Review.findOneAndDelete({ _id: req.params.reviewId, user: req.user._id });
  res.status(200).json({
    success:true,
    message:'review deleted successfully'
  })
});
