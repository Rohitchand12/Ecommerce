import express from "express";
import {getShipment,createShipment, deleteShipment} from "../controllers/shipment.Controller.js"
import { protect } from "../middlewares/authMiddleware/protect.js";
const shipRouter = express.Router();

shipRouter.route("/").get(protect,getShipment).post(protect,createShipment);
shipRouter.route("/deleteshipment").post(protect,deleteShipment);

export default shipRouter