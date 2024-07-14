const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const { registerUser,loginUser,getUser,authenticateUser} = require("../controllers/user.controller.js");
const { authenticateToken } = require("../middlewares/auth.middleware.js");

// Parse request bodies for PUT requests
router.use(bodyParser.json());

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/authenticate").get(authenticateUser);

//router.get('/getUser', authenticateToken, getUser)

module.exports = router;
