import { NextResponse } from "next/server";
import taskServ from "@/lib/services/task.service";

type Params = { params: Promise<{ id: string }> };

export async function deleteTask(req: Request, { params }: Params) {
  const { id } = await params;
  try {
    await taskServ.deleteTask(parseInt(id));
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    const errMessage = (err as Error).message;
    return NextResponse.json(
      {
        success: false,
        message: errMessage,
        error:
          errMessage === "Task not found"
            ? "NOT_FOUND"
            : "INTERNAL_SERVER_ERROR",
      },
      { status: errMessage === "Task not found" ? 404 : 500 },
    );
  }
}
