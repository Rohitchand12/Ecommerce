import express from "express";
import {getShipment,createShipment} from "../controllers/shipment.Controller.js"
import { protect } from "../middlewares/authMiddleware/protect.js";
const shipRouter = express.Router();

shipRouter.route("/").get(protect,getShipment).post(protect,createShipment);

export default shipRouter