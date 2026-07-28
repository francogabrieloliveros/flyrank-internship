import { type Request, type Response } from "express";
import taskServ from "../services/task.service.ts";

class TaskController {
  getAllTasks = async (req: Request, res: Response) => {
    const tasks = await taskServ.getAllTasks();

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully.",
      data: tasks,
    });
  };

  getTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const task = await taskServ.getTaskById(parseInt(id as string));
      res.status(200).json({
        success: true,
        message: "Task retrieved successfully.",
        data: task,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: (err as Error).message,
        error: "NOT_FOUND",
      });
    }
  };

  createTask = async (req: Request, res: Response) => {
    const { title } = req.body;

    try {
      const newTask = await taskServ.createTask(title);

      res.status(201).json({
        success: true,
        message: "Task successfully added.",
        data: newTask,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: (err as Error).message,
        error: "BAD_REQUEST",
      });
    }
  };

  updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, done } = req.body;

    try {
      const updatedTask = await taskServ.updateTask(parseInt(id as string), {
        title,
        done,
      });

      res.status(200).json({
        success: true,
        message: "Task updated successfully.",
        data: updatedTask,
      });
    } catch (err) {
      const errMessage = (err as Error).message;

      res.status(errMessage === "Task not found" ? 404 : 400).json({
        success: false,
        message: errMessage,
        error: errMessage === "Task not found" ? "NOT_FOUND" : "BAD_REQUEST",
      });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await taskServ.deleteTask(parseInt(id as string));

      res.status(204).json({
        success: true,
        message: "Task successfully removed.",
      });
    } catch (err) {
      const errMessage = (err as Error).message;

      res.status(errMessage === "Task not found" ? 404 : 500).json({
        success: false,
        message: errMessage,
        error:
          errMessage === "Task not found"
            ? "NOT_FOUND"
            : "INTERNAL_SERVER_ERROR",
      });
    }
  };
}

export default new TaskController();
