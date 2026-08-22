import { openapiToJson, extractEndpoints, buildSchemaLookup } from "@/openapi";
import { createValidateResponse, executeRequest } from "@/tools/index";
import { buildContext } from "@/agent/context";
import createAgent from "@/agent/createAgent";
import { ToolSet } from "ai";
import { generateReport } from "@/report/generateReport";

const spec = await openapiToJson("./openapi.json");
const endpoints = extractEndpoints(spec);
const getZodSchemaFor = buildSchemaLookup(endpoints);
const validateResponse = createValidateResponse(getZodSchemaFor);

const tools: ToolSet = { executeRequest, validateResponse };
const agent = createAgent(tools);
const result = await agent.generate({
  prompt: `Test the following endpoints:\n${JSON.stringify(endpoints, null, 2)}`,
});

const context = buildContext(result.steps);
const report = await generateReport(context);

import { writeFileSync } from "fs";
writeFileSync("./report-summary.json", JSON.stringify(report, null, 2));
