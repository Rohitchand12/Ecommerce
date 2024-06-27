import Shipping from "../models/shipping.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getShipments = asyncHandler(async(req,res) => {
    const shipments = await Shipping.find();
    res.status(200).json({
        success:true,
        shipments
    })
})

export const createShipment = asyncHandler(async(req,res) => {
    const shipmentObj = {
        user : req.user._id,
        address : req.body.address
    };
    const newShipment = await Shipping.create(shipmentObj);
    res.status(200).json({
        success:true,
        newShipment
    })
})