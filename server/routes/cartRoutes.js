import express from "express";
import { addToCart, getAllCarts, getCart } from "../controllers/cartControllers.js";
import { protect } from "../middlewares/authMiddleware/protect.js";
import cookieParser from "cookie-parser";
const cartRouter = express.Router();

cartRouter.use(cookieParser());
cartRouter.route('/').get(protect,getCart).post(protect,addToCart);

export default cartRouter;