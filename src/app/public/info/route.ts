import { NextResponse } from "next/server";

const publicWelcome = async () => {
  return NextResponse.json(
    {
      success: true,
      message: "Welcome stranger! This info is public.",
      data: null,
    },
    { status: 200 },
  );
};

export const GET = publicWelcome;
