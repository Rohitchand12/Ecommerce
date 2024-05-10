const User = require('../models/user.model');

exports.signup = async(req, res) => {
  const newUser = await User.create(req.body);
  res.status(200).json({
    success: true,
    data:{
      user:newUser
    }
  });
};
exports.login = (req, res) => {
  res.status(200).json({
    success: true,
    message: "this is login route",
  });
};
exports.logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "this is logout route",
  });
};
