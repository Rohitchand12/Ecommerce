import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/sendMail.js";
import { createHash } from "crypto";
import {uploadSingleOnCloudinary} from "../utils/cloudinary.js";
import { Email } from "../utils/sendMail.js";

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const sendJWTResponse = (user, statusCode, res) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  const token = generateToken(payload);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  console.log(cookieOptions);
  if (process.env.NODE_ENV === "production") {
    cookieOptions.domain = ".mystickart.online";
    cookieOptions.secure = true;
    cookieOptions.sameSite = "none";
  }
  user.password = undefined; //so that password is not visible in response , note we're not saving user

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user,
    },
  });
};

export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const feilds = [name, email, password, passwordConfirm];

  //check if any feild is empty
  if (feilds.some((feild) => feild?.trim() === "")) {
    return next(new AppError("All feilds are required"));
  }

  // check if user has an account
  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("User already exists", 400));
  }

  let avatar;
  if (req.file) {
    avatar = await uploadSingleOnCloudinary(req.file.path);
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    avatar: avatar?.url || "",
  });
  const url = "https://github.com/Rohitchand12/Ecommerce/tree/main/server/controllers";
  await new Email(newUser,url).sendWelcome();

  sendJWTResponse(newUser, 200, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email exists in req.body
  if (!email || !password) {
    return next(new AppError("Please provide an email and password", 400));
  }

  // check if user exits and match passwords
  const user = await User.findOne({ email }).select("+password"); // selected password with + explicitly bcoz its by default not selected as per schema

  if (!user || !(await user.validatePassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  //if ok , generate and send token to client

  sendJWTResponse(user, 200, res);
});

export const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("jwt", {
      httpOnly: true,
    })
    .json({
      success: true,
      message: "user logged out successfully",
    });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  //1) check whether user with email provided exists or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("No user found with this email"), 404);
  }

  //2)create a random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3)send token in email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;

  const message = `Forgot your password ? No worries , click on the link to reset password ${resetURL}.If not , please ignore this email`;

  try {
    const url = "#";
    await new Email(user,url).sendResetPasswordLink();
    // await sendEmail({
    //   email: user.email,
    //   subject: "Your password reset token (valid 10 min)",
    //   message,
    // });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("Could not send the email , try again later!"),
      500
    );
  }

  res.status(200).json({
    success: true,
    message: "Password reset token sent to email",
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  //  1)check the reset token sent by user
  const hashedToken = createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) if the token is not expired and there is user , then set new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired "), 400);
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //3) update changePasswordAt property in user model
  // update changePasswordAt is dont in the preSave middleware in user model

  //4) log the user in and send jwt
  sendJWTResponse(user, 200, res);
});

export const getProfile = asyncHandler(async(req,res) => {
  const user  = req.user;
  res.status(200).json({
    success:true,
    data:{
      user
    }
  })
})