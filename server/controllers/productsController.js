const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  // more about async handler in ../utils/asyncHandler.js
  
  const features = new APIFeatures(Product.find().populate('reviews'), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const products = await features.query

  res.status(200).json({
    success: true,
    results: products.length,
    data: {
      products,
    },
  });
});
exports.getProduct = asyncHandler((req, res, next) => {
  res.status(200).json({
    success: true,
    message: "get product route",
  });
});

//ADMIN ROUTES

exports.updateProduct = asyncHandler((req, res, next) => {
  res.status(200).json({
    success: true,
    message: "update product route",
  });
});
exports.postProduct = asyncHandler(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    success: true,
    data: {
      product: newProduct,
    },
  });
});
exports.deleteProduct = asyncHandler((req, res, next) => {
  res.status(200).json({
    success: true,
    message: "delete product route",
  });
});
