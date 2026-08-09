import { NextResponse } from "next/server";

const profile = async (request: Request) => {
  const authorization = request.headers.get("authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json(
      {
        success: false,
        message: "Access token required",
      },
      { status: 401 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Hellow",
    },
    { status: 200 },
  );
};

export const GET = profile;
