import { NextResponse } from "next/server";
import taskServ from "@/lib/services/task.service";

export async function getAllTasks() {
  const tasks = await taskServ.getAllTasks();
  return NextResponse.json({
    success: true,
    message: "Tasks retrieved successfully.",
    data: tasks,
  });
}
