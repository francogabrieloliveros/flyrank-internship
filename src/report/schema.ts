import { z } from "zod";

export const reportSchema = z.object({
  summary: z
    .string()
    .describe(
      "A 2-4 sentence overview of what was tested and the overall health of the API",
    ),
  suggestions: z
    .array(z.string())
    .describe(
      "General improvement suggestions, not necessarily security issues",
    ),
  vulnerabilities: z.array(
    z.object({
      endpoint: z.string(),
      method: z.string(),
      issue: z.string(),
      severity: z.enum(["low", "medium", "high", "critical"]),
      evidence: z
        .string()
        .describe("What specifically in the request/response showed this"),
    }),
  ),
});

export type Report = z.infer<typeof reportSchema>;
