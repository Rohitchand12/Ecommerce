const express = require("express");
const productsController = require("../controllers/productsController");
const productRouter = express.Router();

//defining routes

productRouter
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.postProduct);
  
productRouter
  .route("/:id")
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = productRouter;
