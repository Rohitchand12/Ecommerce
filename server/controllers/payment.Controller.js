import asyncHandler from "../utils/asyncHandler.js";
import Payment from "../models/payment.model.js";
export const getPayments = asyncHandler(async(req,res)=>{
    const payments = await Payment.find();
    res.status(200).json({
        success:true,
        payments
    })
})

export const createPayment = asyncHandler(async(req,res)=>{
    const paymentObj = {
        user: req.user._id,
        method : req.body.method,
        transactionId : req.body.transactionId,
        amount : req.body.amount,
        status : req.body.status
    }

    const newPayment = await Payment.create(paymentObj);
    res.status(200).json({
        success:true,
        newPayment
    })
})