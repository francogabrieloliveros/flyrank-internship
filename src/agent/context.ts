import type { StepResult, ToolSet } from "ai";

export type ContextEntry =
  | { type: "toolCall"; step: number; toolName: string; input: unknown }
  | { type: "toolResult"; step: number; toolName: string; output: unknown }
  | { type: "note"; step: number; text: string };

export const buildContext = (steps: StepResult<ToolSet>[]): ContextEntry[] => {
  const context: ContextEntry[] = [];

  steps.forEach((step, i) => {
    step.toolCalls?.forEach((call) => {
      context.push({
        type: "toolCall",
        step: i,
        toolName: call.toolName,
        input: call.input,
      });
    });

    step.toolResults?.forEach((result) => {
      context.push({
        type: "toolResult",
        step: i,
        toolName: result.toolName,
        output: result.output,
      });
    });

    if (step.text?.trim()) {
      context.push({ type: "note", step: i, text: step.text.trim() });
    }
  });

  return context;
};
