import type Task from "../models/task.model.ts";
import client from "../db/db.ts";

class TaskRepository {
  findAll = async (): Promise<Task[]> => {
    const { rows } = await client.query(`SELECT * FROM tasks`);
    return rows as Task[];
  };

  // findById = async (id: number): Promise<Task | undefined> => {
  //   return db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(id) as
  //     Task | undefined;
  // };

  // create = async (data: Omit<Task, "id">): Promise<Task> => {
  //   const insert = db.prepare(`INSERT INTO tasks (title, done) VALUES (?, ?)`);
  //   const info = insert.run(data.title, data.done ? 1 : 0);

  //   return { id: info.lastInsertRowid as number, ...data };
  // };

  // update = async (id: number, data: Partial<Task>): Promise<Task | null> => {
  //   const task = await this.findById(id);
  //   if (!task) return null;

  //   const title = data.title ?? task.title;
  //   const done = data.done ?? task.done;

  //   db.prepare(
  //     `
  //     UPDATE tasks
  //     SET title = ?, done = ?
  //     WHERE id = ?`,
  //   ).run(title, done ? 1 : 0, id);

  //   return { ...task, title, done };
  // };

  // remove = async (id: number): Promise<boolean> => {
  //   const info = db.prepare(`DELETE FROM tasks WHERE id = ?`).run(id);
  //   return info.changes > 0;
  // };
}

export default new TaskRepository();
