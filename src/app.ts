import express, { type Express } from "express";
import swaggerUi from "swagger-ui-express";
import openApiSpec from "../openapi.json" with { type: "json" };
import taskRouter from "./routes/task.routes.ts";
import serverRouter from "./routes/server.routes.ts";

const app: Express = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/", serverRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use("/tasks", taskRouter);

export default app;
