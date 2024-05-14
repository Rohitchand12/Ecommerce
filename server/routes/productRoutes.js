const express = require("express");
const productsController = require("../controllers/productsController");
const productRouter = express.Router();
const {protect} = require('../middlewares/authMiddleware/protect');
const {restrictTo} = require('../middlewares/authMiddleware/restrictTo');

//defining routes

productRouter
  .route("/")
  .get(productsController.getAllProducts)
  .post(protect,restrictTo('admin'),productsController.postProduct);
  
productRouter
  .route("/:id")
  .get(productsController.getProduct)
  .patch(protect,restrictTo('admin'),productsController.updateProduct)
  .delete(protect,restrictTo('admin'),productsController.deleteProduct);

module.exports = productRouter;
