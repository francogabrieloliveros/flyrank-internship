import { tool } from "ai";
import { z } from "zod";

const executeRequest = tool({
  description: "Send an HTTP request to the local API server being tested",
  inputSchema: z.object({
    path: z.string().describe("e.g. /users/123"),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    headers: z.record(z.string(), z.string()).optional(),
    body: z.any().optional(),
  }),
  execute: async ({ path, method, headers, body }) => {
    const url = `http://localhost:${process.env.TARGET_PORT}${path}`;
    const start = Date.now();
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: body ? JSON.stringify(body) : undefined,
      });
      const text = await res.text();
      let parsedBody;
      try {
        parsedBody = JSON.parse(text);
      } catch {
        parsedBody = text;
      }

      return {
        status: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        body: parsedBody,
        timeMs: Date.now() - start,
      };
    } catch (err: any) {
      return { error: true, message: err.message, timeMs: Date.now() - start };
    }
  },
});

export default executeRequest;
