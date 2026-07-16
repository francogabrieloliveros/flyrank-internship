/**
 * app.tsx
 * -----------------------------------------------------------------------
 * A single-file Express backend for a Todo List application.
 * Even though everything lives in one file, the code is organized into
 * clearly separated sections (Model, Controller, Routes, App) so it
 * mirrors a typical MVC folder structure.
 *
 * Run with: npx ts-node app.tsx
 * (requires: npm i express && npm i -D typescript ts-node @types/express @types/node)
 * -----------------------------------------------------------------------
 */

import express, { Request, Response, Router, NextFunction } from "express";

// ==========================================================================
// MODEL
// ==========================================================================
// Represents the shape of a Todo item and provides an in-memory "database"
// with basic CRUD operations. In a real app this would talk to a real
// database (Postgres, MongoDB, etc.) instead of an in-memory array.
// ==========================================================================

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

class TodoModel {
  private todos: Todo[] = [];
  private nextId = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findById(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  create(title: string): Todo {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: this.nextId++,
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: number, updates: Partial<Pick<Todo, "title" | "completed">>): Todo | null {
    const todo = this.findById(id);
    if (!todo) return null;

    if (updates.title !== undefined) todo.title = updates.title;
    if (updates.completed !== undefined) todo.completed = updates.completed;
    todo.updatedAt = new Date().toISOString();

    return todo;
  }

  delete(id: number): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }
}

// Single shared instance acting as our in-memory data store.
const todoModel = new TodoModel();

// ==========================================================================
// CONTROLLER
// ==========================================================================
// Contains the request-handling logic: reads input from the request,
// talks to the model, and shapes the HTTP response. Keeps the routes
// file thin and declarative.
// ==========================================================================

class TodoController {
  // GET /api/todos
  getAllTodos(req: Request, res: Response): void {
    const todos = todoModel.findAll();
    res.status(200).json({ success: true, data: todos });
  }

  // GET /api/todos/:id
  getTodoById(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const todo = todoModel.findById(id);

    if (!todo) {
      res.status(404).json({ success: false, message: `Todo with id ${id} not found` });
      return;
    }

    res.status(200).json({ success: true, data: todo });
  }

  // POST /api/todos
  createTodo(req: Request, res: Response): void {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      res.status(400).json({ success: false, message: "Field 'title' is required and must be a non-empty string" });
      return;
    }

    const todo = todoModel.create(title.trim());
    res.status(201).json({ success: true, data: todo });
  }

  // PUT /api/todos/:id
  updateTodo(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    if (title !== undefined && (typeof title !== "string" || !title.trim())) {
      res.status(400).json({ success: false, message: "Field 'title' must be a non-empty string" });
      return;
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      res.status(400).json({ success: false, message: "Field 'completed' must be a boolean" });
      return;
    }

    const updated = todoModel.update(id, { title, completed });

    if (!updated) {
      res.status(404).json({ success: false, message: `Todo with id ${id} not found` });
      return;
    }

    res.status(200).json({ success: true, data: updated });
  }

  // DELETE /api/todos/:id
  deleteTodo(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const deleted = todoModel.delete(id);

    if (!deleted) {
      res.status(404).json({ success: false, message: `Todo with id ${id} not found` });
      return;
    }

    res.status(204).send();
  }
}

const todoController = new TodoController();

// ==========================================================================
// ROUTES
// ==========================================================================
// Maps HTTP verbs + paths to controller methods. Mounted under /api/todos
// in the main app below.
// ==========================================================================

const todoRouter: Router = express.Router();

todoRouter.get("/", todoController.getAllTodos);
todoRouter.get("/:id", todoController.getTodoById);
todoRouter.post("/", todoController.createTodo);
todoRouter.put("/:id", todoController.updateTodo);
todoRouter.delete("/:id", todoController.deleteTodo);

// ==========================================================================
// APP
// ==========================================================================
// Wires everything together: middleware, routes, error handling, and
// server startup.
// ==========================================================================

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/todos", todoRouter);

// Basic health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Todo API is running" });
});

// 404 handler for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Centralized error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Todo API listening on http://localhost:${PORT}`);
});

export default app;
