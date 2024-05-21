import AppError from "../../utils/appError.js";

export function restrictTo(...roles) {
  return (req, res, next) => {
    // this is a closure ,so it will have access to roles
    //roles = ['admin','user'] whatever is passed
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You donot have permission to perform  this action"),
        403
      ); //403 -> forbidden
    }
    next();
  };
}

//  in above if statement , we write req.user.role bcoz we use restrictTo middleware after protect
// and in protect ,at last wrote req.user = currentUser , hence user is available in req
