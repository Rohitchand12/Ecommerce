import express from "express";
import { getPayments, createOrder, paymentVerification } from "../controllers/payment.Controller.js";
import { protect } from "../middlewares/authMiddleware/protect.js";
const paymentRouter = express.Router();

paymentRouter.route("/").get(getPayments).post(protect, createOrder);
paymentRouter.route("/verifypayment").post(protect,paymentVerification)
export default paymentRouter;
