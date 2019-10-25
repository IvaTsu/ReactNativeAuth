const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    minLength: 5,
    unique: true,
    required: "Email is required!",
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is a vrong email address!"
    }
  },
  password: {
    type: String,
    trim: true,
    required: "Password is required!"
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    minLength: 3,
    required: "Username is required!"
  }
});

userSchema.pre("save", function(next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return Promise.reject(err);
    }
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      // err here to prevent brutForce
      user.password = hashedPassword;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
