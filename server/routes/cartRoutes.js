import express from "express";
import { addToCart, deleteItem, getAllCarts, getCart, updateQuantity } from "../controllers/cartControllers.js";
import { protect } from "../middlewares/authMiddleware/protect.js";
import cookieParser from "cookie-parser";
const cartRouter = express.Router();

cartRouter.use(cookieParser());
cartRouter.route('/').get(protect,getCart).post(protect,addToCart);
cartRouter.route('/updateitem').post(protect,updateQuantity)
cartRouter.route('/deleteItem').post(protect,deleteItem)

export default cartRouter;