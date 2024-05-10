exports.signup = (req, res) => {
  res.status(200).json({
    success: true,
    message: "this is signup route",
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
