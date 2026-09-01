import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { inngest } from "@/inngest";
import { reports } from "@/reports/reports";

export const sendWork = async (req: Request, res: Response) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "topic is required" });
  }

  const id = randomUUID();
  reports.set(id, { id, topic, status: "pending" });

  await inngest.send({
    name: "report/requested",
    data: { id, topic },
  });

  res.status(202).json({ id, status: "pending" });
};

export const getReport = async (req: Request, res: Response) => {
  const report = reports.get(req.params.id as string);

  if (!report) {
    return res.status(404).json({ error: "not found" });
  }

  res.json(report);
};
