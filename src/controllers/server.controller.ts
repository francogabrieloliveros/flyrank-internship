import { type Request, type Response } from "express";

class ServerController {
  getStatus = async (req: Request, res: Response) => {
    res.status(200).json({
      name: "Task API",
      version: "1.0",
      endpoints: ["/tasks", "/docs"],
    });
  };

  getHealth = async (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  };
}

export default new ServerController();
