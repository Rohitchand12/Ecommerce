const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add product description"],
      trim: true,
    },
    highlights: [
      {
        type: String,
        required: [true, "proceed to add a highlight"],
      },
    ],
    specifications: [
      {
        title: {
          type: String,
          required: [true, "specification title is required"],
        },
        description: {
          type: String,
          required: [true, "specification description is required"],
        },
      },
    ],
    original_price: {
      type: Number,
      required: [true, "original Price is required"],
    },
    sale_price: {
      type: Number,
    },
    coverImage: {
      type: String,
      required: [true, "cover image of product is required"],
    },
    images: [
      {
        url: {
          type: String,
          required: [true, "images url required"],
        },
      },
    ],
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    color: {
      type: String,
      trim: true,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//virtual populate

productSchema.virtual("reviews",{
    ref:'Review',
    foreignField:'product',
    localField:'_id'
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
