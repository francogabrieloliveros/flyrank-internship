import { NextResponse } from "next/server";
import taskServ from "@/lib/services/task.service";

export async function createTask(req: Request) {
  const { title } = await req.json();
  try {
    const newTask = await taskServ.createTask(title);
    return NextResponse.json(
      { success: true, message: "Task successfully added.", data: newTask },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: (err as Error).message, error: "BAD_REQUEST" },
      { status: 400 },
    );
  }
}
