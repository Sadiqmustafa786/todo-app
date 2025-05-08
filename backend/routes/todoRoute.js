const express = require("express");
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create todo
router.post("/create", authMiddleware, createTodo);

// Get all todos
router.get("/getAll", authMiddleware, getTodos);

// Delete todo
router.delete("/delete/:id", authMiddleware, deleteTodo);

// Update todo
router.patch("/update/:id", authMiddleware, updateTodo);

module.exports = router;
