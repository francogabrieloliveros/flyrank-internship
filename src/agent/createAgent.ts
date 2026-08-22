import { ToolLoopAgent, ToolSet, isStepCount } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { setTimeout } from "node:timers/promises";
import instructions from "@/agent/instructions";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const createAgent = (tools: ToolSet) => {
  let stepCount = 0;

  const agent = new ToolLoopAgent({
    model: openrouter("poolside/laguna-s-2.1:free"),
    tools,
    stopWhen: isStepCount(30),
    instructions,
    onStepFinish: async (step) => {
      stepCount++;
      console.log(
        `Step ${stepCount} finished:`,
        step.toolCalls?.map((c) => c.toolName),
      );

      if (stepCount % 20 === 0) {
        console.log(`Hit ${stepCount} steps — pausing 60s for rate limit...`);
        await setTimeout(60_000);
      }
    },
  });

  return agent;
};

export default createAgent;
