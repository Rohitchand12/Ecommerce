import mongoose from "mongoose";

export const shippingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Shipping details must belong to a user"],
    },
    address: {
      street: { type: String},
      city: { type: String, required: true },
      location: { type: String, required: true },
      pinCode: { type: String, required: true },
      country: { type: String, required: true },
    }
  },
  { timestamps: true }
);

const Shipping = mongoose.model("Shipping", shippingSchema);
export default Shipping;
