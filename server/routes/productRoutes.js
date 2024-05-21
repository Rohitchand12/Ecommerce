import { Router } from "express";
import { getAllProducts, postProduct, getProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";
const productRouter = Router();
import { protect } from "../middlewares/authMiddleware/protect.js";
import { restrictTo } from "../middlewares/authMiddleware/restrictTo.js";
import upload from "../middlewares/multer/multer.js";

//defining routes

// productRouter
//   .route("/upload")
//   .post(upload.single('fileUpload'), productsController.uploadFile);
productRouter
  .route("/")
  .get(getAllProducts)
  .post(protect, restrictTo("admin"),upload.fields([
    {
      name:"coverImage",
      maxCount:1
    },
    {
      name:"productImages",
      maxCount:8
    }
  ]), postProduct);

productRouter
  .route("/:productId")
  .get(getProduct)
  .patch(protect, restrictTo("admin"), updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct);

export default productRouter;
