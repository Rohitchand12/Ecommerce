const express = require("express");
const authController = require('../controllers/authController');
const authRouter = express.Router();

//defining routes

authRouter.route('/signup').post(authController.signup);
authRouter.route('/login').post(authController.login);
authRouter.route('/logout').post(authController.logout);

module.exports = authRouter;
