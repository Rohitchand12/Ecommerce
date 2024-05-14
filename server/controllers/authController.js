const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const sendEmail = require('../utils/sendMail');

const generateToken = (payload) => {
  const token = jwt.sign(payload,process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_IN
  })
  return token;
}


exports.signup = asyncHandler(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    image: req.body.image,
    passwordChangedAt :req.body.passwordChangedAt // remove this later
  });
  const payload = {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
  const token = generateToken(payload)

  res.status(200).json({
    success: true,
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = asyncHandler(async (req, res , next) => {

  const {email , password} = req.body

  //check if email exists in req.body
  if(!email || !password){
    return next(new AppError('Please provide an email and password',400))
  }

  // check if user exits and match passwords
  const user = await User.findOne({email}).select('+password') // selected password with + explicitly bcoz its by default not selected as per schema 

  if(!user || !(await user.validatePassword(password,user.password))){
    return next(new AppError('Invalid email or password',401));
  }

  //if ok , generate and send token to client

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  const token = generateToken(payload)


  res.status(200).json({
    success: true,
    token,
    message: "this is login route",
  });
});
exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "this is logout route",
  });
});


exports.forgotPassword = asyncHandler(async(req,res,next) => {
  //1) check whether user with email provided exists or not
  const user = await User.findOne({email : req.body.email})
  if(!user){
    return next(new AppError('No user found with this email'),404);
  }

  //2)create a random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({validateBeforeSave:false});

})

exports.resetPassword = (req,res,res) => {

}
