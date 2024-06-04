const express = require("express");
const {
  createTask,
  editTask,
  deleteTask,
  getTasks,
} = require("../Controllers/TaskController");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/create-task", protect, createTask);
router.put("/edit-task/:id", protect, editTask);
router.delete("/delete-task/:id", protect, deleteTask);
router.get("/get-tasks", protect, getTasks);

module.exports = router;
