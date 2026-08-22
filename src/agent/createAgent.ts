import { ToolLoopAgent, ToolSet, isStepCount } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import instructions from "./instructions";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const createAgent = (tools: ToolSet) => {
  const agent = new ToolLoopAgent({
    model: openrouter("poolside/laguna-s-2.1:free"),
    tools,
    stopWhen: isStepCount(3),
    instructions,
  });

  return agent;
};

export default createAgent;
