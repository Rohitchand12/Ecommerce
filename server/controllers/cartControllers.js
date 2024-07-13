import Cart from "../models/cart.model.js";
import AppError from "../utils/appError.js";
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
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
    {
      sale_price: 1,
      title: 1,
      coverImage: 1,
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
  const { item, quantity } = req.body;
  const cartExists = await Cart.findOne({ user: req.user._id });
  let cartInfo;
  if (cartExists) {
    const itemExists = cartExists.items.find(
      (cartItem) => cartItem.product._id.toString() === item.product.toString()
    );
    if (itemExists) {
      res.status(200).json({
        success: true,
        message: "Item is already added to cart",
      });
      return;
    } else {
      cartInfo = await Cart.findOneAndUpdate(
        { user: req.user._id },
        { $push: { items: item } },
        { new: true }
      );
    }
  } else {
    cartInfo = await Cart.create({
      user: req.user._id,
      items: [item],
      quantity: quantity || 1,
    });
  }
  res.status(200).json({
    success: true,
    data: {
      cartInfo,
    },
  });
});

export const updateQuantity = asyncHandler(async (req, res, next) => {
  const { itemId, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  console.log(typeof(cart.items[0].product._id.toString()));
  console.log(typeof(itemId));
  console.log(cart)
  if (cart) {
    const item = cart.items.find(
      (item) => item.product._id.toString() === itemId
    );
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.status(200).json({
        success: true,
        data: {
          cart,
        },
      });
    } else {
      next(new AppError("item not found in cart", 400));
    }
  } else {
    next(new AppError("cart not found", 400));
  }
});

export const deleteItem = asyncHandler(async(req,res)=>{
  const {itemId} = req.body;
  const cart = await Cart.findOneAndUpdate({user: req.user._id},{$pull :{items:{product :itemId}}},{new:true});
  res.status(200).json({
    success:true,
    data:{
      cart
    }
  })
})
