const asyncHandler = require("express-async-handler");
const Task = require("../Models/TaskModel");

const createTask = asyncHandler(async (req, res) => {
  const user = req.user;
  const { text } = req.body; // Extract the additional fields from the request body

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (!text) {
    res.status(400);
    throw new Error("All fields are required");
  }

  try {
    const task = new Task({
      user: user._id,
      text,
    });
    await task.save();
    res.status(201).json({
      message: "Task added successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

const editTask = asyncHandler(async (req, res) => {
  const { id } = req.params; // Access taskId correctly from req.params
  const { text } = req.body; // Extract the additional fields from the request body

  if (!id) {
    res.status(400);
    throw new Error("Invalid task ID");
  }

  if (!text) {
    res.status(400);
    throw new Error("Text field is required");
  }

  try {
    const task = await Task.findByIdAndUpdate(id, { text }, { new: true });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.status(200).json(task); // Respond with the updated task
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    throw new Error("Invalid task ID");
  }

  try {
    const task = await Task.findByIdAndDelete(id);

    if (task) {
      res.status(200).json({
        message: "Task deleted successfully",
      });
    } else {
      res.status(404); // Task not found
      throw new Error("Task not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

const getTasks = asyncHandler(async (req, res) => {
  const user = req.user;
  const userId = user._id;

  if (!userId) {
    res.status(400);
    throw new Error("User ID and token not found");
  }

  try {
    const tasks = await Task.find({ user: userId });

    if (tasks.length === 0) {
      res.status(200).json({ message: "No tasks found" });
    } else {
      res.status(200).json(tasks);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks" });
  }
});

module.exports = {
  createTask,
  editTask,
  deleteTask,
  getTasks,
};
