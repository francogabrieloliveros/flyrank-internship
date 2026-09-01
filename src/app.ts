import express, { type Express } from "express";
import healthRoute from "@/routes/health.route";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest";

const app: Express = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/health", healthRoute);
app.use("/api/inngest", serve({ client: inngest, functions }));

export default app;
