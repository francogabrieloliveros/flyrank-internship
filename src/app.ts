import express, { type Express } from "express";
import healthRoute from "@/routes/health.route";
import reportRoute from "@/routes/report.route";

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/health", healthRoute);
app.use("/reports", reportRoute);

export default app;
