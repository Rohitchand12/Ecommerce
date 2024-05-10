const express = require("express");
const productsController = require("../controllers/productsController");
const productRouter = express.Router();

//defining routes

productRouter.route("/").get(productsController.getAllProducts);
productRouter
  .route("/:id")
  .get(productsController.getProduct)
  .post(productsController.postProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = productRouter;
