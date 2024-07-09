import Cart from "../models/cart.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllCarts = asyncHandler(async (req, res) => {
  const allCarts = await Cart.find().populate("items.product", {
    sale_price: 1,
    title: 1,
  });
  res.status(200).json({
    success: true,
    data: {
      allCarts,
    },
  });
});

export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({user : req.user._id}).populate(
    "items.product",
    {
      sale_price: 1,
      title: 1,
      coverImage:1
    }
  );
  res.status(200).json({
    success: true,
    data: {
      cart,
    },
  });
});

export const addToCart = asyncHandler(async (req, res) => {
  const {item,quantity} = req.body;
  const cartExists = await Cart.findOne({ user: req.user._id });
  let cartInfo;
  if (cartExists){
    cartInfo = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $push: { items: item } },
      { new: true }
    );
  } else {
    cartInfo = await Cart.create({
      user: req.user._id,
      items: [item],
      quantity : quantity || 1,
    });
  }
  res.status(200).json({
    success: true,
    data: {
      cartInfo,
    },
  });
});
