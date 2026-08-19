import { ZodType } from "zod";
import jsonSchemaToZod from "@/openapi/jsonSchemaToZod";
import type { EndpointInfo } from "@/openapi/types";

const buildSchemaLookup = (endpoints: EndpointInfo[]) => {
  const schemaMap = new Map<string, ZodType>();

  for (const endpoint of endpoints) {
    if (endpoint.responseSchema) {
      const key = `${endpoint.method}:${endpoint.path}`;
      schemaMap.set(key, jsonSchemaToZod(endpoint.responseSchema));
    }
  }

  return (path: string, method: string): ZodType | undefined => {
    return schemaMap.get(`${method.toUpperCase()}:${path}`);
  };
};

export default buildSchemaLookup;
