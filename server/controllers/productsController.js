import Product from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import { uploadMultipleOnCloudinary } from "../utils/cloudinary.js";

export const getAllProducts = asyncHandler(async (req, res, next) => {
  // more about async handler in ../utils/asyncHandler.js
  const search = req.query.search || "";
  const totalCountQuery = new APIFeatures(Product.find(), req.query).filter().query;
  const totalCount = await totalCountQuery.countDocuments();

  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const products = await features.query.populate("reviews");

  res.status(200).json({
    success: true,
    totalCount,
    results: products.length,
    data: {
      products,
    },
  });
});

export const getHomePage = asyncHandler(async (req, res) => {
  const homePage = await Product.aggregate([
    {
      $facet: {
        topOffers: [
          {
            $addFields: {
              discount: { $subtract: ["$original_price", "$sale_price"] },
            },
          },
          {
            $sort: { discount: -1 },
          },
          {
            $limit: 4,
          },
          {
            $project: {
              coverImage: 1,
              original_price: 1,
              sale_price: 1,
              title: 1,
            },
          },
        ],
        categories: [
          {
            $group: {
              _id: "$category",
              image: { $first: "$coverImage" },
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
          {
            $limit: 10,
          },
          {
            $project: {
              category: "$_id",
              count: 1,
              image: 1,
            },
          },
        ],
        products: [
          {
            $match: { quantity: { $gt: 0 } },
          },
          {
            $sample: { size:8 },
          },
          {
            $limit: 8,
          },
          {
            $project: {
              title: 1,
              original_price: 1,
              sale_price: 1,
              coverImage: 1,
            },
          },
        ],
        randomImages:[
          {
            $match:{quantity:{$gt:0}}
          },
          {
            $sample:{size:8}
          },
          {
            $project:{
              coverImage:1
            }
          }
        ]
      },
    },
  ]);
  res.status(200).json({
    success:true,
    data:{
      homePage
    }
  })
});


export const getCategories = asyncHandler(async(req,res)=>{
  const categories = await Product.aggregate([
    {
      $group:{
        _id:"$category",
        count:{$sum : 1},
        image : {$first : "$coverImage"}
      }
    },
    {
      $project:{
        category : "$_id",
        count : 1,
        image :1
      }
    }
  ])
  res.status(200).json({
    success:true,
    data:{
      categories
    }
  })
})


export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.find({ _id: req.params.productId }).populate("reviews");
  res.status(200).json({
    success: true,
    product,
  });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  // handle to update images also

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );
  res.status(200).json({
    success: true,
    updatedProduct,
  });
});

export const postProduct = asyncHandler(async (req, res, next) => {
  let coverImageName;
  let coverImage;
  let imagesURL;

  //taking out path of files from req.files
  if (req.files) {
    const allImagePaths = Object.keys(req.files).flatMap((key) =>
      req.files[key].map((file) => file.path)
    );
    // taking out coverImage name
    coverImageName = req.files?.coverImage[0]?.filename.split(".")[0];
    //upload multiple files to cloudinary
    const uploads = await uploadMultipleOnCloudinary(allImagePaths);

    // comparing coverimage name to filename and getting coverImage URL
    coverImage = uploads?.find(
      (upload) => upload.original_filename === coverImageName
    ).url;

    // getting other images URL
    imagesURL = uploads
      ?.filter((upload) => upload.original_filename !== coverImageName)
      .map((upload) => ({ url: upload.url }));
  }

  const productData = {
    title: req.body.title || "",
    description: req.body.description || "",
    original_price: req.body.original_price || 0,
    sale_price: req.body.sale_price || 0,
    seller: req.body.seller || "",
    brand: req.body.brand || "",
    category: req.body.category || "",
    quantity: req.body.quantity || 0,
    coverImage: coverImage || "",
    images: imagesURL || [],
    highlights: req.body.highlights || [], //[""]
    specifications: req.body.specifications || [], //[{title: , description:}]
    color: req.body.color || "",
  };

  const newProduct = await Product.create(productData);

  res.status(200).json({
    success: true,
    data: {
      product: newProduct,
    },
  });
});
export const deleteProduct = asyncHandler(async (req, res, next) => {
  await Product.findOneAndDelete({ _id: req.params.productId });
  res.status(200).json({
    success: true,
    message: "Product deleted successfully!",
  });
});

/*
  req.files = {
    cover :[
      {
        path: ....
      }
    ]
  }


  allImagesPath after iterating over req.files and flattening the array:
  allImagesPath = ["path1","path2","path3"...];


  passed this array of paths to cloudinary upload fucnction;


  uploads = [
    {
      original_filename:"somename"

    }
  ]




*/
