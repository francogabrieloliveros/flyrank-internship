import { EndpointInfo } from "@/openapi/types";

const extractEndpoints = (spec: any): EndpointInfo[] => {
  const endpoints: EndpointInfo[] = [];

  // Traverse each path from spec and find req/res schemas
  for (const [path, methods] of Object.entries<any>(spec.paths)) {
    for (const [method, def] of Object.entries<any>(methods)) {
      endpoints.push({
        path,
        method: method.toUpperCase(),
        requestSchema: def.requestBody?.content?.["application/json"]?.schema,
        responseSchema:
          def.responses?.["200"]?.content?.["application/json"]?.schema,
      });
    }
  }

  return endpoints;
};

export default extractEndpoints;
