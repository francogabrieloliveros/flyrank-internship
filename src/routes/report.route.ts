import { Router } from "express";
import { getReport, sendWork } from "@/controllers/report.controller";

const router = Router();

router.post("/", sendWork);
router.get("/:id", getReport);

export default router;
