import { NextResponse } from "next/server";
import taskServ from "@/lib/services/task.service";

type Params = { params: Promise<{ id: string }> };

export async function getTask(req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const task = await taskServ.getTaskById(parseInt(id));
    return NextResponse.json({
      success: true,
      message: "Task retrieved successfully.",
      data: task,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: (err as Error).message, error: "NOT_FOUND" },
      { status: 404 },
    );
  }
}
