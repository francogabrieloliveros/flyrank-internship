/**
 * Todo List Application - Backend
 * Stack: Express + Mongoose + MongoDB
 *
 * Everything lives in this single file, but is organized into clearly
 * separated sections: MODEL -> CONTROLLERS -> ROUTES -> ERROR HANDLER -> APP
 */

import express, { Request, Response, NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/* --------------------------------------------------------------------- */
/* DATABASE CONNECTION                                                    */
/* --------------------------------------------------------------------- */

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in the environment file.");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

/* --------------------------------------------------------------------- */
/* MODEL                                                                  */
/* --------------------------------------------------------------------- */

export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
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
  { timestamps: true }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

/* --------------------------------------------------------------------- */
/* HELPERS                                                                */
/* --------------------------------------------------------------------- */

// Wraps async controller functions so thrown/rejected errors are
// forwarded to the centralized error handler instead of crashing.
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Builds an update object containing only fields that were actually
// provided in the request body, so omitted fields never overwrite
// existing values with undefined.
const buildUpdatePayload = (body: Record<string, any>) => {
  const allowedFields = ["title", "description", "completed"];
  const payload: Record<string, any> = {};

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  }

  return payload;
};

/* --------------------------------------------------------------------- */
/* CONTROLLERS (kept as standalone functions, not grouped in a class)     */
/* --------------------------------------------------------------------- */

// GET /api/todos
// Returns todos with unfinished ones first, completed ones last.
// Within each group, todos are sorted by creation date (oldest first).
const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const todos = await Todo.find().sort({ completed: 1, createdAt: 1 });

  res.status(200).json({
    success: true,
    data: todos,
  });
});

// GET /api/todos/:id
const getTodoById = asyncHandler(async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    data: todo,
  });
});

// POST /api/todos
const createTodo = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, completed } = req.body;

  const todo = await Todo.create({ title, description, completed });

  res.status(201).json({
    success: true,
    data: todo,
  });
});

// PATCH /api/todos/:id
// Only updates fields that were actually sent in the request body.
const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const updatePayload = buildUpdatePayload(req.body);

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { $set: updatePayload },
    { new: true, runValidators: true, context: "query" }
  );

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    data: todo,
  });
});

// DELETE /api/todos/:id
const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    data: todo,
  });
});

/* --------------------------------------------------------------------- */
/* ROUTES                                                                 */
/* --------------------------------------------------------------------- */

const todoRouter = express.Router();

todoRouter.get("/", getTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.post("/", createTodo);
todoRouter.patch("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

/* --------------------------------------------------------------------- */
/* CENTRALIZED ERROR HANDLER                                              */
/* --------------------------------------------------------------------- */

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error(err);

  // Invalid MongoDB ObjectId (e.g. malformed :id param)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: `Invalid value for field '${err.path}': ${err.value}`,
    });
  }

  // Mongoose schema validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val: any) => val.message);
    return res.status(400).json({
      success: false,
      error: messages.join(", "),
    });
  }

  // Duplicate key error (unique index violations)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {}).join(", ");
    return res.status(400).json({
      success: false,
      error: `Duplicate value for field: ${field}`,
    });
  }

  // Fallback: unexpected/internal errors
  return res.status(500).json({
    success: false,
    error: "Internal server error",
  });
};

/* --------------------------------------------------------------------- */
/* APP SETUP                                                              */
/* --------------------------------------------------------------------- */

const app = express();

app.use(express.json());

app.use("/api/todos", todoRouter);

// 404 handler for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Centralized error handler must be registered last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
