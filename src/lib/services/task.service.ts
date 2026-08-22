import type Task from "@/lib/models/task.model";
import supabase from "@/lib/supabase/server";

class TaskService {
  getAllTasks = async (): Promise<Task[]> => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  getTaskById = async (id: number): Promise<Task | undefined> => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      throw new Error("Task not found");
    }
    return data;
  };

  createTask = async (title: string): Promise<Task> => {
    if (!title || title.trim() === "") {
      throw new Error("Title is required");
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert({ title, done: false })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  updateTask = async (
    id: number,
    data: Partial<Task>,
  ): Promise<Task | null> => {
    const existing = await this.getTaskById(id).catch(() => undefined);
    if (!existing) {
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

    const { data: updated, error } = await supabase
      .from("tasks")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return updated;
  };

  deleteTask = async (id: number): Promise<void> => {
    const existing = await this.getTaskById(id).catch(() => undefined);
    if (!existing) {
      throw new Error("Task not found");
    }

    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      throw new Error("Failed to delete task");
    }
  };
}

const taskService = new TaskService();
export default taskService;
