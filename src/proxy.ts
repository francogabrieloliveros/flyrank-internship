import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import supabase from "@/lib/supabase/server";

export async function proxy(request: NextRequest) {
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

  const response = NextResponse.next();
  response.headers.set("x-user-id", user.id);
  response.headers.set("x-user-email", user.email ?? "");
  response.headers.set("authorization", authorization);
  return response;
}

export const config = {
  matcher: ["/protected/:path*", "/auth/logout"],
};
