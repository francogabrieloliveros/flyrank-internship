import { openapiToJson, extractEndpoints, buildSchemaLookup } from "@/openapi";
import { createValidateResponse, executeRequest } from "@/tools/index";
import createAgent from "@/agent/createAgent";
import { ToolSet } from "ai";

const spec = await openapiToJson("./openapi.json");
const endpoints = extractEndpoints(spec);
const getZodSchemaFor = buildSchemaLookup(endpoints);
const validateResponse = createValidateResponse(getZodSchemaFor);

const tools: ToolSet = { executeRequest, validateResponse };
const agent = createAgent(tools);
const result = await agent.generate({
  prompt: `Test the following endpoints:\n${JSON.stringify(endpoints, null, 2)}`,
});

console.log(result.output);
