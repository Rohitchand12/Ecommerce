const express = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(categoryController.get_all_categories)
  .post(categoryController.add_category);

module.exports = categoryRouter;
