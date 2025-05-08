const Todo = require("../models/todoModel");

// @desc    Get all todos for user
// @route   GET /api/v1/todo
// @access  Private
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json({
      success: true,
      count: todos.length,
      todos,
    });
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching todos",
      error: process.env.DEV_MODE === "development" ? error.message : undefined,
    });
  }
};

// @desc    Create new todo
// @route   POST /api/v1/todo
// @access  Private
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const todo = await Todo.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.error("Create todo error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating todo",
      error: process.env.DEV_MODE === "development" ? error.message : undefined,
    });
  }
};

// @desc    Update todo
// @route   PUT /api/v1/todo/:id
// @access  Private
const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this todo",
      });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    if (typeof completed !== "undefined") {
      todo.completed = completed;
    }

    const updatedTodo = await todo.save();

    res.status(200).json({
      success: true,
      todo: updatedTodo,
    });
  } catch (error) {
    console.error("Update todo error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating todo",
      error: process.env.DEV_MODE === "development" ? error.message : undefined,
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/v1/todo/:id
// @access  Private
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this todo",
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting todo",
      error: process.env.DEV_MODE === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
