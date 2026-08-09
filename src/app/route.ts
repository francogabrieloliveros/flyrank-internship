import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks", "/docs"],
  });
}
