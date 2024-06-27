import express from "express";
import { signup, login, logout, forgotPassword, resetPassword, getProfile } from '../controllers/authController.js';
import upload from "../middlewares/multer/multer.js";
import { protect } from "../middlewares/authMiddleware/protect.js";
const authRouter = express.Router();
//defining routes

authRouter.route('/signup').post(upload.single("avatar"),signup);
authRouter.route('/login').post(login);
authRouter.route('/logout').post(protect,logout);
authRouter.route('/forgotPassword').post(forgotPassword);
authRouter.route('/resetPassword/:token').post(resetPassword);
authRouter.route('/profile').get(protect,getProfile);
export default authRouter;
