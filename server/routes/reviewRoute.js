const express = require("express");
const routeController = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .get(routeController.get_all_reviews)
  .post(routeController.create_review);

module.exports = reviewRouter;
