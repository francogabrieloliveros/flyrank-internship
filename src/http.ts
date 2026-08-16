import { REQUEST_TIMEOUT_MS, USER_AGENT } from "./config.ts";

export const politeFetch = async (url: string): Promise<Response> => {
  const res = await fetch(url, {
    headers: { "user-agent": USER_AGENT },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status} for ${url}`);
  }

  return res;
};
