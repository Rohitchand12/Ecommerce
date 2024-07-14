import Shipping from "../models/shipping.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getShipment = asyncHandler(async(req,res) => {
    const shipments = await Shipping.find({user:req.user._id});
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

export const deleteShipment = asyncHandler(async(req,res)=>{
    const {shipmentId} = req.body;
    const shipment = await Shipping.findByIdAndDelete(shipmentId);
    if(!shipment){
        return res.status(404).json({
            success:false,
            message: "Shipment not found"
        })
    }
    res.status(200).json({
        success:true,
        message: "Shipment deleted successfully"
    })
})