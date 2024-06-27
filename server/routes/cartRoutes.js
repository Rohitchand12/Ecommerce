import { Router } from "express";
import { addToCart, getAllCarts, getCart } from "../controllers/cartControllers.js";
import { protect } from "../middlewares/authMiddleware/protect.js";
const cartRouter = Router();

cartRouter.route('/').get(protect,getCart).post(protect,addToCart);

export default cartRouter;