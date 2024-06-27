import mongoose from "mongoose"

export const paymentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'User',
        required:[true,"Payment must belong to a user"]
    },
    method:{
        type:String,
        enum :["debit","UPI","credit"],
        required:[true,"payment method is required"]
    },
    transactionId :{
        type:String,
        required:[true,"transaction id is required"]
    },
    amount:{
        type:Number,
        required:[true,"Payment amount is required"]
    },
    status:{
        type:String,
        enum:["pending","success","failed"],
        required:[true,"Payment status is required"]
    }
},{timestamps:true})

const Payment = mongoose.model("Payment",paymentSchema);
export default Payment;