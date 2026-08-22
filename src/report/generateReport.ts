import { generateText, Output } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { reportSchema, type Report } from "./schema";
import type { ContextEntry } from "@/agent/context";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateReport = async (
  context: ContextEntry[],
): Promise<Report> => {
  const { output } = await generateText({
    model: openrouter("nvidia/nemotron-3-super-120b-a12b:free"),
    output: Output.object({ schema: reportSchema }),
    prompt: `
    IMPORTANT: Respond with ONLY raw JSON matching the required schema.
    Do not wrap it in markdown code fences. Do not add any explanation
    before or after the JSON.

    Below is a chronological trace of an API testing session: tool calls,
    their results, and notes written by the testing agent as it worked through
    each endpoint.

    Review the full trace and produce a final report. Identify real vulnerabilities
    only — things with actual evidence in the trace (schema validation failures,
    unexpected status codes, sensitive data exposure, missing input validation,
    inconsistent error handling). Do not invent issues that aren't supported by
    the trace.

    Trace:
    ${JSON.stringify(context, null, 2)}
    `,
  });

  return output;
};
