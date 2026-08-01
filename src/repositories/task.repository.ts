import type Task from "../models/task.model.ts";
import client from "../db/db.ts";

class TaskRepository {
  findAll = async (): Promise<Task[]> => {
    const { rows } = await client.query<Task>(`SELECT * FROM tasks`);
    return rows;
  };

  findById = async (id: number): Promise<Task | undefined> => {
    const query = { text: "SELECT * FROM tasks WHERE id = $1", values: [id] };
    const {
      rows: [task],
    } = await client.query<Task>(query);

    return task;
  };

  create = async (data: Omit<Task, "id">): Promise<Task> => {
    const query = {
      text: "INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *",
      values: [data.title, data.done],
    };
    const {
      rows: [newTask],
    } = await client.query<Task>(query);

    return newTask;
  };

  update = async (id: number, data: Partial<Task>): Promise<Task | null> => {
    const task = await this.findById(id);
    if (!task) return null;

    const title = data.title ?? task.title;
    const done = data.done ?? task.done;

    const query = {
      text: "UPDATE tasks SET title = $1, done = $2 WHERE id = $3",
      values: [title, done, id],
    };
    await client.query<Task>(query);

    return { ...task, title, done };
  };

  remove = async (id: number): Promise<boolean> => {
    const query = { text: "DELETE FROM tasks WHERE id = $1", values: [id] };
    const { rows } = await client.query<Task>(query);

    return rows.length > 0;
  };
}

export default new TaskRepository();
