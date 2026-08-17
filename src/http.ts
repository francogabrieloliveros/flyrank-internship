import { setTimeout } from "node:timers/promises";
import {
  MAX_RETRIES,
  ERROR_WAIT_MS,
  REQUEST_TIMEOUT_MS,
  USER_AGENT,
} from "./config.ts";

export const politeFetch = async (url: string): Promise<Response> => {
  let retry = 0;
  while (retry < MAX_RETRIES) {
    const res = await fetch(url, {
      headers: { "user-agent": USER_AGENT },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (res.ok) {
      return res;
    }

    if (res.status >= 500) {
      retry++;
      await setTimeout(ERROR_WAIT_MS);
      continue;
    }

    throw new Error("Scarping blocked.");
  }

  throw new Error("Max retries reached.");
};
