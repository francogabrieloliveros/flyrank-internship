import { setTimeout } from "timers/promises";
import {
  byteSize,
  cache,
  fileExists,
  getPageFile,
  readCache,
} from "../cache.ts";
import { politeFetch } from "../http.ts";
import { POLITE_DELAY_MS } from "../config.ts";

const CACHE_DIR = "cache";

export const fetchCataloguePage = async (pageUrl: string): Promise<string> => {
  const pageFile = getPageFile(pageUrl);
  const filename = `catalogue-${pageFile}`;

  if (await fileExists(`${CACHE_DIR}/${filename}`)) {
    const html = await readCache(CACHE_DIR, filename);
    console.log(`CACHE HIT ${pageUrl} (${byteSize(html)} bytes)`);
    return html;
  }

  const res = await politeFetch(pageUrl);
  const html = await res.text();
  console.log(`FETCH ${pageUrl} (${byteSize(html)} bytes)`);

  await cache(html, CACHE_DIR, filename);

  await setTimeout(POLITE_DELAY_MS);
  return html;
};
