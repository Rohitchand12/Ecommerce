const express = require("express");
const authController = require('../controllers/authController');
const authRouter = express.Router();

//defining routes

authRouter.route('/signup').get(authController.signup);
authRouter.route('/login').get(authController.login);
authRouter.route('/logout').get(authController.logout);

module.exports = authRouter;
