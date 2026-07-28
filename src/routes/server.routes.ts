import { Router } from "express";
import sc from "../controllers/server.controller.ts";

const router = Router();

router.get("/", sc.getStatus);
router.get("/health", sc.getHealth);

export default router;
