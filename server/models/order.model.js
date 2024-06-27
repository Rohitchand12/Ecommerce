import mongoose from "mongoose"
import { paymentSchema } from "./payment.model.js";
import { shippingSchema } from "./shipping.model.js";

const orderSchema = new mongoose.Schema({
    customer :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Order must belong to a customer"]
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:[true,"Order must have Products"]
        }
    ],
    payment :{
        type: paymentSchema,
        required:[true,"Payment details are required"]
    },
    shipping:{
        type: shippingSchema,
        required:[true,"Shipping details are required"]
    },
    status:{
        type:String,
        enum:['pending','shipped','delivered','cancelled','returned'],
        default:'pending'
    },
    totalAmount:{
        type:Number,
        required:true
    }

},{timestamps:true})

const Order = mongoose.model("Order",orderSchema);
export default Order;