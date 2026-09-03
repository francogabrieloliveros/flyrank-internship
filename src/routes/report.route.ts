import { Router } from "express";
import {
  generateReport,
  getReport,
  getReportPdf,
} from "@/controllers/report.controller";

const router = Router();

router.post("/", generateReport);
router.get("/:id", getReport);
router.get("/:id/file", getReportPdf);

export default router;
