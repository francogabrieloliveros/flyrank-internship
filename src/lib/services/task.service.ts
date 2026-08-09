import taskRepo from "@/lib/repositories/task.repository";
import type Task from "@/lib/models/task.model";

class TaskService {
  getAllTasks = async (): Promise<Task[]> => {
    return await taskRepo.findAll();
  };

  getTaskById = async (id: number): Promise<Task | undefined> => {
    const task = await taskRepo.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  };

  createTask = async (title: string): Promise<Task> => {
    if (!title || title.trim() === "") {
      throw new Error("Title is required");
    }

    return await taskRepo.create({ title, done: false });
  };

  updateTask = async (
    id: number,
    data: Partial<Task>,
  ): Promise<Task | null> => {
    const oldTask = await taskRepo.findById(id);
    if (!oldTask) {
      throw new Error("Task not found");
    }

    const hasTitle = data.title !== undefined;
    const hasDone = data.done !== undefined;

    if (!hasTitle && !hasDone) {
      throw new Error("At least one field (title or done) must be provided");
    }

    if (
      hasTitle &&
      (typeof data.title !== "string" || data.title.trim() === "")
    ) {
      throw new Error("Title must be a non-empty string");
    }

    if (hasDone && typeof data.done !== "boolean") {
      throw new Error("Done must be a boolean");
    }

    const updatedTask = await taskRepo.update(id, data);
    return updatedTask;
  };

  deleteTask = async (id: number): Promise<void> => {
    const toDelTask = await taskRepo.findById(id);

    if (!toDelTask) {
      throw new Error("Task not found");
    }

    const deleted = taskRepo.remove(id);

    if (!deleted) {
      throw new Error("Failed to delete task");
    }
  };
}

const taskService = new TaskService();
export default taskService;
