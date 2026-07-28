import express, { type Express, type Request, type Response } from "express";
import swaggerUi from "swagger-ui-express";
import openApiSpec from "./openapi.json" with { type: "json" };

const app: Express = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Interfaces
interface Task {
  id: number;
  title: string;
  done: boolean;
}

// Memory
const tasks: Task[] = [
  { id: 1, title: "Finish BE-01", done: true },
  { id: 2, title: "Finish FL-03", done: false },
  { id: 3, title: "Feed the dog", done: false },
];

// Routes and controllers
app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.get("/tasks", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Tasks retrieved successfully.",
    data: tasks,
  });
});

app.get("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    res.status(404).json({
      success: false,
      message: `Task ${id} not found.`,
      error: "NOT_FOUND",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Task retrieved successfully.",
      data: task,
    });
  }
});

app.post("/tasks", (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({
      success: false,
      message: "No title provided.",
      error: "BAD_REQUEST",
    });
  } else {
    // Get the highest id and add 1
    const newId: number = Math.max(...tasks.map((task) => task.id)) + 1;

    const newTask = { id: newId, title, done: false };
    tasks.push(newTask);
    res.status(201).json({
      success: true,
      message: "Task successfully added.",
      data: newTask,
    });
  }
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, done } = req.body;

  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    res.status(404).json({
      success: false,
      message: `Task ${id} not found.`,
      error: "NOT_FOUND",
    });
  } else if (!title && typeof done !== "boolean") {
    res.status(400).json({
      success: false,
      message: "Invalid body",
      error: "BAD_REQUEST",
    });
  } else {
    task.title = title ?? task.title;
    task.done = done ?? task.done;

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: task,
    });
  }
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    res.status(404).json({
      success: false,
      message: `Task ${id} not found.`,
      error: "NOT_FOUND",
    });
  } else {
    tasks.splice(taskIndex, 1);
    res.status(204).json({
      success: true,
      message: "Task successfully removed.",
    });
  }
});

// App
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
