import { Router } from "express";
import tc from "../controllers/task.controller.ts";

const router = Router();

router.get("/", tc.getAllTasks);
router.get("/:id", tc.getTask);
router.post("/", tc.createTask);
router.put("/:id", tc.updateTask);
router.delete("/:id", tc.deleteTask);

export default router;
