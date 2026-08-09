import { NextResponse } from "next/server";
import taskServ from "@/lib/services/task.service";

type Params = { params: Promise<{ id: string }> };

export async function updateTask(req: Request, { params }: Params) {
  const { id } = await params;
  const { title, done } = await req.json();
  try {
    const updatedTask = await taskServ.updateTask(parseInt(id), {
      title,
      done,
    });
    return NextResponse.json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (err) {
    const errMessage = (err as Error).message;
    return NextResponse.json(
      {
        success: false,
        message: errMessage,
        error: errMessage === "Task not found" ? "NOT_FOUND" : "BAD_REQUEST",
      },
      { status: errMessage === "Task not found" ? 404 : 400 },
    );
  }
}
