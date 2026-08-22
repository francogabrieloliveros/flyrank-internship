import { tool } from "ai";
import { z } from "zod";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

const isHostLocal = (hostname: string): boolean => {
  if (LOCAL_HOSTS.has(hostname)) return true;
  return /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname);
};

const executeRequest = tool({
  description: "Send an HTTP request to the local API server being tested",
  inputSchema: z.object({
    path: z.string().describe("e.g. /users/123"),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    headers: z.record(z.string(), z.string()).optional(),
    body: z.any().optional(),
  }),
  execute: async ({ path, method, headers, body }) => {
    const url = new URL(path, `http://localhost:${process.env.TARGET_PORT}`);

    if (!isHostLocal(url.hostname)) {
      return {
        error: true,
        blocked: true,
        message: `Refused: "${url.hostname}" is not a loopback host. This agent may only send requests to localhost.`,
      };
    }

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
