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

cartSchema.pre("save",async function(next){
    await this.populate("items.product",{
      sale_price: 1,
      title: 1,
    });
    this.totalPrice = this.items.reduce((acc,item)=>acc+(item.product.sale_price*item.quantity) , 0);
    next();
})
cartSchema.post(/^findOneAnd/,async function(doc,next){
  if (!doc) return next(new AppError("Invalid cart or user ", 400));
  console.log("inside post findOneAndUpdate", doc);
  await doc.populate({
    path: "items.product",
    select: "sale_price title",
  })
  doc.totalPrice = doc.items.reduce((acc,item)=>{
    return acc+(item.product.sale_price*item.quantity);
  },0);
  await doc.save();
  next();
})

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
