const User = require('../models/user.model');
const asyncHandler = require("../utils/asyncHandler");

exports.signup = asyncHandler(async(req, res) => {
  const newUser = await User.create(req.body);
  res.status(200).json({
    success: true,
    data:{
      user:newUser
    }
  });
});
exports.login = asyncHandler(async(req, res) => {
  res.status(200).json({
    success: true,
    message: "this is login route",
  });
});
exports.logout = asyncHandler(async(req, res) => {
  res.status(200).json({
    success: true,
    message: "this is logout route",
  });
});
