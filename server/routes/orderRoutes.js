import { Router } from "express";
import {createOrder, getOrders} from "../controllers/ordersController.js"
import { protect } from "../middlewares/authMiddleware/protect.js";
const orderRouter = Router();

orderRouter.route("/").get(getOrders).post(protect,createOrder)
export default orderRouter;