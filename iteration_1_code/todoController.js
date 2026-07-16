const Todo = require('../models/todoModel');

// GET /api/todos
// Supports optional ?completed=true|false filtering
function getTodos(req, res) {
  let todos = Todo.getAll();

  const { completed } = req.query;
  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    todos = todos.filter((todo) => todo.completed === isCompleted);
  }

  res.status(200).json({ success: true, count: todos.length, data: todos });
}

// GET /api/todos/:id
function getTodo(req, res) {
  const id = Number(req.params.id);
  const todo = Todo.getById(id);

  if (!todo) {
    return res.status(404).json({ success: false, error: `Todo with id ${id} not found` });
  }

  res.status(200).json({ success: true, data: todo });
}

// POST /api/todos
function createTodo(req, res) {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ success: false, error: 'Title is required and must be a non-empty string' });
  }

  const todo = Todo.create({ title: title.trim(), description, completed });
  res.status(201).json({ success: true, data: todo });
}

// PUT /api/todos/:id
function updateTodo(req, res) {
  const id = Number(req.params.id);
  const { title, description, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ success: false, error: 'Title must be a non-empty string' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ success: false, error: 'Completed must be a boolean' });
  }

  const todo = Todo.update(id, { title, description, completed });

  if (!todo) {
    return res.status(404).json({ success: false, error: `Todo with id ${id} not found` });
  }

  res.status(200).json({ success: true, data: todo });
}

// DELETE /api/todos/:id
function deleteTodo(req, res) {
  const id = Number(req.params.id);
  const wasDeleted = Todo.remove(id);

  if (!wasDeleted) {
    return res.status(404).json({ success: false, error: `Todo with id ${id} not found` });
  }

  res.status(200).json({ success: true, data: {} });
}

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
