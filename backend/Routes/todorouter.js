const express = require("express");
const router = express.Router();
const todo = require("../Models/todo.model.js");
const User = require("../Models/user.model.js");
const bodyParser = require("body-parser");
const authenticateToken = require('../middlewares/auth.middleware.js')

// Parse request bodies for PUT requests
router.use(bodyParser.json());

router.post("/addTodo",  async (req, res) => {
  try {
    const newTodo = new todo({
      title: req.body.task_name,
      description: req.body.task_description,
      status: req.body.task_status,
      priority: req.body.task_priority,
      user: req.body.userID,
    });

    const savedTodo = await newTodo.save();
    res.json({ status: true, savedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the todo." });
  }
});

router.get("/viewTasks", async (req, res) => {
  try {
    const userID = req.query.userID; // Assuming userID is passed as a query parameter
    //console.log(userID);

    const user = await User.findById(userID);

    // Query todos with the userID filter
    const tasks = await todo.find({ user: userID });
    //console.log(tasks);

    res.status(200).json({ tasks: tasks, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching tasks." });
  }
});

router.get("/viewTasks/:id", async (req, res) => {
  try {
    const tasks = await todo.findById(req.params.id);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching task details." });
  }
});

router.put("/updateTask/:id", async (req, res) => {
  const mapData = (data) => {
    return {
      title: data.task_name,
      description: data.task_description,
      status: data.task_status,
      priority: data.task_priority,
    };
  };

  try {
    const id = req.params.id;
    const updatedData = mapData(req.body);
    // console.log(reqid)
    // console.log(reqbody);
    const updatedTask = await todo.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedTask);
    //  console.log(updatedTask);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the task." });
  }
});

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const tasks = await todo.findByIdAndDelete(req.params.id);
    // console.log(req.params.id);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
