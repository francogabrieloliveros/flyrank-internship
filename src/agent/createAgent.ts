import { ToolLoopAgent, ToolSet, isStepCount } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const createAgent = (tools: ToolSet) => {
  const agent = new ToolLoopAgent({
    model: openrouter("poolside/laguna-s-2.1:free"),
    tools,
    stopWhen: isStepCount(3),
    instructions: `You are an API testing agent. You will be given a list of endpoints.
    For each endpoint: analyze its schema, invent both valid and invalid payloads
    (missing fields, wrong types, boundary values, injection attempts, missing auth),
    call executeRequest to send them, call validateResponse to check the response
    against the documented schema, and briefly note what you observed before moving
    to the next case or endpoint.`,
  });

  return agent;
};

export default createAgent;
