import { openapiToJson, extractEndpoints, buildSchemaLookup } from "@/openapi";
import { createValidateResponse, executeRequest } from "@/tools/index";

const spec = await openapiToJson("./openapi.json");
const endpoints = extractEndpoints(spec);
const getZodSchemaFor = buildSchemaLookup(endpoints);
const validateResponse = createValidateResponse(getZodSchemaFor);

const tools = { executeRequest, validateResponse };
