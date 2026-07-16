/**
 * Todo List Backend — ExpressJS + Mongoose + MongoDB
 * Single-file app: Model, Controllers, Routes, and Error Handling are
 * kept in clearly separated sections below (not bundled into one class).
 *
 * Env vars required (.env):
 *   PORT=5000
 *   MONGODB_URI=mongodb://127.0.0.1:27017/todo-app
 */

require('dotenv').config({ quiet: true });

const express = require('express');
const mongoose = require('mongoose');

/* ------------------------------------------------------------------ */
/* MODEL                                                              */
/* ------------------------------------------------------------------ */

const { Schema, model } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = model('Todo', todoSchema);

/* ------------------------------------------------------------------ */
/* CONTROLLERS (plain exported functions, not bundled in a class)     */
/* ------------------------------------------------------------------ */

// Fields a client is allowed to write. Used to build a sparse update
// object so that omitted fields in the request body are simply left
// untouched instead of being coerced to `undefined`.
const UPDATABLE_FIELDS = ['title', 'description', 'completed'];

function buildSparseUpdate(body) {
  const update = {};
  for (const field of UPDATABLE_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      update[field] = body[field];
    }
  }
  return update;
}

async function createTodo(req, res, next) {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.create({ title, description, completed });
    return res.status(201).json({ success: true, data: todo });
  } catch (err) {
    return next(err);
  }
}

async function getTodos(req, res, next) {
  try {
    // Unfinished todos first, completed todos last.
    // Within each group, sort by creation date (oldest first).
    const todos = await Todo.find().sort({ completed: 1, createdAt: 1 });
    return res.status(200).json({ success: true, data: todos });
  } catch (err) {
    return next(err);
  }
}

async function getTodoById(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    return res.status(200).json({ success: true, data: todo });
  } catch (err) {
    return next(err);
  }
}

async function updateTodo(req, res, next) {
  try {
    // Only fields explicitly present in req.body are included, so
    // omitted fields are left as-is rather than becoming undefined.
    const update = buildSparseUpdate(req.body);

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true, context: 'query' }
    );

    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    return res.status(200).json({ success: true, data: todo });
  } catch (err) {
    return next(err);
  }
}

async function deleteTodo(req, res, next) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    return res.status(200).json({ success: true, data: todo });
  } catch (err) {
    return next(err);
  }
}

/* ------------------------------------------------------------------ */
/* ROUTES                                                             */
/* ------------------------------------------------------------------ */

const router = express.Router();

router.post('/todos', createTodo);
router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.patch('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

/* ------------------------------------------------------------------ */
/* CENTRALIZED ERROR HANDLER                                          */
/* ------------------------------------------------------------------ */

// Must be registered last, after all routes.
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(err);

  // Invalid ObjectId (e.g. malformed :id param)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Invalid value "${err.value}" for field "${err.path}"`,
    });
  }

  // Mongoose schema validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: messages.join(', '),
    });
  }

  // Duplicate key errors (in case unique indexes are added later)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: `Duplicate value for field(s): ${Object.keys(err.keyValue).join(', ')}`,
    });
  }

  // Fallback
  return res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
}

/* ------------------------------------------------------------------ */
/* APP SETUP                                                          */
/* ------------------------------------------------------------------ */

const app = express();

app.use(express.json());
app.use('/api', router);

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.use(errorHandler);

/* ------------------------------------------------------------------ */
/* DB CONNECTION + SERVER START                                       */
/* ------------------------------------------------------------------ */

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}

module.exports = app;
