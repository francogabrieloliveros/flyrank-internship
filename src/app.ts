import express, { type Express } from "express";
import healthRoute from "@/routes/health.route";

const app: Express = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/health", healthRoute);

export default app;
