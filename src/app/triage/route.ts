import { NextResponse } from "next/server";
import LLMService from "@/lib/services/llm.service";

export const POST = async (request: Request) => {
  const { prompt } = await request.json();

  if (!prompt.trim()) {
    return NextResponse.json(
      {
        success: false,
        message: "Prompt required.",
      },
      { status: 400 },
    );
  }

  try {
    const output = await LLMService.triage(prompt);

    return NextResponse.json(
      {
        success: true,
        message: "Tasks retrieved successfully.",
        data: output,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: (err as Error).message,
      },
      { status: 500 },
    );
  }
};
