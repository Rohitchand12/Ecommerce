import asyncHandler from "../utils/asyncHandler.js";
import { instance } from "../app.js";
import Payment from "../models/payment.model.js";
import crypto from "crypto";
export const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  res.status(200).json({
    success: true,
    payments,
  });
});

export const createOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: Number(amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    data: {
      order,
    },
  });
});
export const paymentVerification = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  // verify the order
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_TEST_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature == razorpay_signature) {
    // save to database
    await Payment.create({
      user: req.user._id,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });
    
    res.status(200).json({
      success:true,
      referenceid:razorpay_payment_id
    })
  } else {
    res.status(400).json({
      success: false,
    });
  }
});
