import { Router } from "express";
import { get_all_reviews, create_review , update_review, delete_review } from "../controllers/reviewController.js";
import {protect} from "../middlewares/authMiddleware/protect.js"
const reviewRouter = Router();

reviewRouter
  .route("/")
  .get(get_all_reviews)

reviewRouter.route("/:productId").post(protect,create_review);
reviewRouter.route("/:reviewId").patch(protect,update_review).delete(protect,delete_review);
export default reviewRouter;
