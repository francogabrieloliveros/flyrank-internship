import type Task from "../models/task.model.ts";
import db from "../config/db.ts";

class TaskRepository {
  findAll = async (): Promise<Task[]> => {
    return db.prepare(`SELECT * FROM tasks`).all() as Task[];
  };

  findById = async (id: number): Promise<Task | undefined> => {
    return db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(id) as
      Task | undefined;
  };

  // create = async (data: Omit<Task, "id">): Promise<Task> => {
  //   const newId: number = Math.max(...this.tasks.map((task) => task.id)) + 1;

  //   const newTask = { id: newId, ...data };
  //   this.tasks.push(newTask);

  //   return newTask;
  // };

  // update = async (id: number, data: Partial<Task>): Promise<Task | null> => {
  //   const task = this.tasks.find((t: Task) => t.id === id);
  //   if (!task) return null;

  //   task.done = data.done ?? task.done;
  //   task.title = data.title ?? task.title;

  //   return task;
  // };

  // remove = async (id: number): Promise<boolean> => {
  //   const taskIndex = this.tasks.findIndex((task) => task.id === id);

  //   if (taskIndex === -1) return false;

  //   this.tasks.splice(taskIndex, 1);
  //   return true;
  // };
}

export default new TaskRepository();
