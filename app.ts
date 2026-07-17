import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const port = 3000;

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
