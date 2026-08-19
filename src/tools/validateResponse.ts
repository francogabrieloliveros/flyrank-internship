import { tool } from "ai";
import { z } from "zod";
import type buildSchemaLookup from "@/openapi/buildSchemaLookup";

const createValidateResponse = (
  getZodSchemaFor: ReturnType<typeof buildSchemaLookup>,
) => {
  return tool({
    description:
      "Validate a response body against the endpoint's expected schema",
    inputSchema: z.object({
      endpointPath: z.string(),
      method: z.string(),
      responseBody: z.any(),
    }),
    execute: async ({ endpointPath, method, responseBody }) => {
      const schema = getZodSchemaFor(endpointPath, method);
      if (!schema)
        return {
          validated: false,
          reason: "no schema found for this endpoint",
        };

      const result = schema.safeParse(responseBody);
      return result.success
        ? { validated: true }
        : { validated: false, issues: result.error.issues };
    },
  });
};

export default createValidateResponse;
