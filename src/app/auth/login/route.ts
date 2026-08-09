import { NextResponse } from "next/server";
import supabase from "@/lib/supabase/server";

const login = async (request: Request) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { success: false, message: "Invalid login credentials" },
      { status: 401 },
    );
  }

  const {
    session: { access_token, refresh_token },
  } = data;

  return NextResponse.json(
    {
      success: true,
      message: "Login successful",
      data: { access_token, refresh_token },
    },
    { status: 200 },
  );
};

export const POST = login;
