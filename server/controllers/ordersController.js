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
    const {products,payment,shipping,status,totalAmount} = req.body;
    console.log(req.body);
    const newOrder = Order.create({
        products,
        payment,
        shipping,
        status,
        totalAmount,
        customer:req.user._id
    })
    res.status(200).json({
        success:true,
        newOrder
    })
})