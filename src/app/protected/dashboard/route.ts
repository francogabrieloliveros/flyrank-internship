import { NextResponse } from "next/server";

const dashboard = async (request: Request) => {
  const userId = request.headers.get("x-user-id");
  const userEmail = request.headers.get("x-user-email");

  return NextResponse.json(
    {
      success: true,
      message: "This is the dashboard.",
      data: { userId, userEmail },
    },
    { status: 200 },
  );
};

export const GET = dashboard;
