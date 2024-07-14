const express = require("express");
const bodyParser = require("body-parser");
const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { login } = require("../utils/login.js");
const { getUsers } = require("../utils/getUsers.js");

const registerUser = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10); // Await the password hashing
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    res.json({ status: "ok", user: user });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email error code for MongoDB
      res.json({ status: "error", error: "Duplicate email" });
    } else {
      res.json({ status: "error", error: "Something went wrong" });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { existingUser, token } = await login(
      req.body.email,
      req.body.password
    ); // Await the login function
    //console.log(token, existingUser);

    // Fetch user details here
    //const existingUser = await User.findOne({ email: req.body.email });

    res.json({ status: "ok", token: token, user: existingUser }); // Include user in response
  } catch (error) {
    res
      .status(401)
      .json({ status: "error", error: "User with this email doesn't exist" }); // Return error status code
  }
};

const authenticateUser = (req, res) => {
  const token = req.query.token;  // Access token from query parameters
  console.log(token);
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
    jwt.verify(token, "karan123", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    res.json({ status: "ok", user });
  });
};


module.exports = {
  registerUser,
  loginUser,
  authenticateUser
};
