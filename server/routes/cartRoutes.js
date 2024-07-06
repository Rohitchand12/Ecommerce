import express from "express";
import { addToCart, getAllCarts, getCart } from "../controllers/cartControllers.js";
import { protect } from "../middlewares/authMiddleware/protect.js";
const cartRouter = express.Router();

cartRouter.route('/').post(protect,getCart)
// .post(protect,addToCart);

export default cartRouter;