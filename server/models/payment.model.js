import mongoose from "mongoose";

export const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Payment must belong to a user"],
    },
    razorpay_payment_id: {
      type: String,
      required: [true, "Razorpay payment id is required"],
    },
    razorpay_order_id: {
      type: String,
      required: [true, "Razorpay orderid is required"],
    },
    razorpay_signature: {
      type: String,
      required: [true, "Razorpay signature is required"],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
