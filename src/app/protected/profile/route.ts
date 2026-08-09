import { NextResponse } from "next/server";
import supabase from "@/lib/supabase/server";

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

  const {
    data: { user },
  } = await supabase.auth.getUser(authorization.replace("Bearer ", ""));

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired token",
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
