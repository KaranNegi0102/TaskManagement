const User = require("../Models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },  
    "karan123",
    { expiresIn: "7d" }
  );
}

async function login(email, password) {
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const isPassWordValid = await bcrypt.compare(password, existingUser.password); // Await the promise

  if (!isPassWordValid) {
    throw new Error("Password Incorrect");
  }

  const token = generateToken(existingUser);
  // console.log(token);
  return { existingUser, token };
}

module.exports = {
  login,
};
