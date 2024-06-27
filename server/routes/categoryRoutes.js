import express from "express";
import { showCategories } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.route('/').get(showCategories);

export default categoryRouter;