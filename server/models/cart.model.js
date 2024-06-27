import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Cart must have a product"],
        },
        quantity: {
          type: Number,
          required: [true, "Cart item must have a quantity"],
          default: 1,
          min: 1,
          max: 5,
        },
      },
    ],
    totalPrice:{
        type:Number,
        default:0
    }
  },
  { timestamps: true }
);

cartSchema.pre("save",function(next){
    this.totalPrice = this.items.reduce((acc,item)=>acc+(item.price*item.quantity) , 0);
    next();
})

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
