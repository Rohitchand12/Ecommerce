import express from "express";
import { getPayments, createPayment } from "../controllers/payment.Controller.js";
import { protect } from "../middlewares/authMiddleware/protect.js";
const paymentRouter = express.Router();

paymentRouter.route("/").get(getPayments).post(protect, createPayment);
export default paymentRouter;
