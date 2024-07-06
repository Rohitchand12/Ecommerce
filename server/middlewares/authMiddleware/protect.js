import AppError from "../../utils/appError.js";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import { promisify } from "util";
import asyncHandler from "../../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  console.log("inside protect middleware")
  console.log(req.cookies);
  console.log(req);
  // 1) get the token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // its ['Bearer', 'Token']
  }else if(req.cookies && req.cookies.jwt ){
    console.log(req.cookies);
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in , please login to access resources"),
      401
    );
  }
  // 2) Verify token
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3) check if user still exists
  const currentUser = await User.findById(decodedToken.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token was deleted."),
      401
    );
  }

  // 4) check if user changed password after token issued

  if (currentUser.isPasswordChanged(decodedToken.iat)) {
    return next(
      new AppError("Your Password was Changed! Please login again.", 401)
    );
  }

  //if all checks passed , then allow to access next route
  req.user = currentUser // might be userful later
  next();
});
