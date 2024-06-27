import express from "express";
import {getShipments,createShipment} from "../controllers/shipment.Controller.js"
import { protect } from "../middlewares/authMiddleware/protect.js";
const shipRouter = express.Router();

shipRouter.route("/").get(getShipments).post(protect,createShipment);

export default shipRouter