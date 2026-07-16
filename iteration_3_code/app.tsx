/**
 * Todo List Application - Express + Mongoose Backend
 * -----------------------------------------------------
 * Everything lives in this single file, but is organized into clearly
 * separated sections: Model, Controllers, Routes, and App bootstrap.
 *
 * Environment variables (place in a .env file at the project root):
 *   MONGODB_URI=mongodb://localhost:27017/todo-app
 *   PORT=3000
 */

import express, { Request, Response, NextFunction, Router } from "express";
import mongoose, { Schema, Document, Model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// ============================================================
// MODEL
// ============================================================

interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo: Model<ITodo> = mongoose.model<ITodo>("Todo", TodoSchema);

// ============================================================
// CONTROLLERS
// (kept as standalone functions per resource, not bundled into
// a single parent class, so each controller is independent)
// ============================================================

// --- Get all todos ---
async function getTodos(req: Request, res: Response, next: NextFunction) {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: todos });
  } catch (error) {
    next(error);
  }
}

// --- Get a single todo by ID ---
async function getTodoById(req: Request, res: Response, next: NextFunction) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    return res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
}

// --- Create a new todo ---
async function createTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.create({ title, description, completed });
    return res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
}

// --- Update an existing todo ---
async function updateTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    return res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
}

// --- Delete a todo ---
async function deleteTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
}

// ============================================================
// ROUTES
// ============================================================

const todoRouter: Router = express.Router();

todoRouter.get("/", getTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

// ============================================================
// APP BOOTSTRAP
// ============================================================

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI as string;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", todoRouter);

// Basic 404 handler for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Centralized error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

async function startServer() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();

export default app;
