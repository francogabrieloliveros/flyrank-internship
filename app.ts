import express, { type Express, type Request, type Response } from "express";

const app: Express = express();

app.use(express.json());

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

// App
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
