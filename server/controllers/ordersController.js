import Order from "../models/order.model.js";
import asyncHandler from "../utils/asyncHandler.js";


export const getOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find();
    res.status(200).json({
        success:true,
        orders
    })
})
export const createOrder = asyncHandler(async(req,res) => {
    const orderObj = {
        customer: req.user._id,
        products : req.products,
        payment : req.payment,
        shipping : req.shipping,
        status : req.status,
        totalAmount : req.totalAmount
    }
    const order = Order.create(orderObj);
    res.status(200).json({
        success:true,
        order
    })
})