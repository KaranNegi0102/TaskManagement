const User = require("../Models/user.model.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    //res.json(users);
    return users;
  } catch (error) {
    res
      .status(500)
      .json({
        message: error.message || "An error occurred while fetching users",
      });
  }
};

module.exports = {
  getUsers,
};
