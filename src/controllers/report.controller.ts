import type { Request, Response } from "express";
import path from "path";
import db from "@/config/seed";
import getReportData from "@/config/get-report-data";
import buildReportHtml from "@/config/build-report-html";
import renderReport from "@/utils/render-report";

interface ReportRow {
  id: number;
  path: string;
  created_at: string;
}

export const generateReport = (req: Request, res: Response) => {
  try {
    // Make temp row
    const insert = db.prepare("INSERT INTO reports (path) VALUES (?)");
    const info = insert.run("");
    const id = info.lastInsertRowid as number;

    // Create report pdf
    const report = getReportData();
    const html = buildReportHtml(report);
    renderReport(html, id);

    // Update reports table
    const filePath = path.join("reports", `${id}.pdf`);
    db.prepare("UPDATE reports SET path = ? WHERE id = ?").run(filePath, id);

    res.status(201).json({
      id,
      file: `/reports/${id}/file`,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to generate report",
      message: (err as Error).message,
    });
  }
};

export const getReport = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(404).json({ error: "Not found" });
  }

  const row = db
    .prepare<[number], ReportRow>("SELECT * FROM reports WHERE id = ?")
    .get(id);

  if (!row) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({
    id: row.id,
    created_at: row.created_at,
    file: `/reports/${row.id}/file`,
  });
};

export const getReportPdf = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(404).json({ error: "Not found" });
  }

  const row = db
    .prepare<[number], ReportRow>("SELECT * FROM reports WHERE id = ?")
    .get(id);

  if (!row) {
    return res.status(404).json({ error: "Not found" });
  }

  res.sendFile(path.resolve(row.path));
};
