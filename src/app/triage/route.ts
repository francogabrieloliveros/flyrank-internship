import { NextResponse } from "next/server";
import LLMService, { LLMUnavailableError } from "@/lib/services/llm.service";

export const POST = async (request: Request) => {
  const { prompt } = await request.json();

  if (!prompt || !prompt.trim()) {
    return NextResponse.json(
      { success: false, message: "Prompt required." },
      { status: 400 },
    );
  }

  try {
    const output = await LLMService.triage(prompt);
    return NextResponse.json(
      {
        ...output,
        message: "Triage completed successfully.",
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof LLMUnavailableError) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 504 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: (err as Error).message,
      },
      { status: 422 },
    );
  }
};
