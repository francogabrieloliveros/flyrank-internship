import { NextResponse } from "next/server";
import supabase from "@/lib/supabase/server";

const signup = async (request: Request) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required" },
      { status: 400 },
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({ email, password });

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 },
    );
  }

  return NextResponse.json(
    { success: true, message: "Signup successful", data: user },
    { status: 201 },
  );
};

export const POST = signup;
