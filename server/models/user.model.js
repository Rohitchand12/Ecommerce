const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 8,
      select: false, // never show in output
    },
    passwordConfirm: {
      type: String,
      required: [true, "confirm password is required"],
      validate: {
        //this only works on save, so when updating password , please use save()
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    passwordChangedAt: {
      // feild is available only if password is changed
      type: Date,
    },
    passwordResetToken: {
      // to store encrypted passwordResetToken
      type: String,
    },
    passwordResetExpires: {
      // to store expiration time of reset token
      type: Date,
    },
  },
  { timestamps: true }
);

//Document middlewares
userSchema.pre("save", async function (next) {
  //check is password is not modified
  if (!this.isModified("password")) return next();

  //if password is modified , then hash password
  this.password = await bcrypt.hash(this.password, 12);

  //setting passwordConfirm = undefined will not make it appear in DB bcoz it is required
  this.passwordConfirm = undefined;
  next();
});

//Instance methods

userSchema.methods.validatePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.isPasswordChanged = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    //JwtTimestamp is in seconds , so converting passwordChanged time to seconds
    const passwordChangedTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); // second argument is base

    return jwtTimestamp < passwordChangedTime;
    //Password Changed after jwt was issued will result to true i.e password is changed
    //Password changed before jwt was issued is fine so it will return false
  }

  userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).string("hex");

    this.passwordResetToken = crypto // encrypt using crypto
      .hash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
  };

  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
