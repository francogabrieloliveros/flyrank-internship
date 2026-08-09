import { NextResponse } from "next/server";
import supabase from "@/lib/supabase/server";

const logout = async (request: Request) => {
  const authorization = request.headers.get("authorization");

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 },
    );
  }

  return new NextResponse(null, { status: 204 });
};

export const POST = logout;
