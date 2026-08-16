import * as cheerio from "cheerio";
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
import type { BookDetails } from "./types.ts";

const CACHE_DIR = "cache/records";

export const fetchBookDetails = async (
  bookUrl: string,
  sourcePage: string,
): Promise<BookDetails> => {
  const pageFile = getPageFile(bookUrl);
  const filename = `${pageFile}.json`;

  if (await fileExists(`${CACHE_DIR}/${filename}`)) {
    console.log(`CACHE HIT ${bookUrl}`);
    const cached = await readCache(CACHE_DIR, filename);
    return JSON.parse(cached) as BookDetails;
  }

  const res = await politeFetch(bookUrl);
  const html = await res.text();
  console.log(`FETCH ${bookUrl} (${byteSize(html)} bytes)`);

  const bookDetails = parseBookDetails(html, bookUrl, sourcePage);

  await cache(JSON.stringify(bookDetails, null, 2), CACHE_DIR, filename);

  await setTimeout(POLITE_DELAY_MS);
  return bookDetails;
};

const parseBookDetails = (
  html: string,
  bookUrl: string,
  sourcePage: string,
): BookDetails => {
  const $ = cheerio.load(html);
  const $main = $(".product_page .product_main");

  return {
    title: $main.find("h1").text().trim(),
    product_url: bookUrl,
    price_text: $main.find(".price_color").text().trim(),
    availability_text: $main.find(".availability").text().trim(),
    rating_text:
      $(".product_page .star-rating")
        .attr("class")
        ?.replace("star-rating", "")
        .trim() || "",
    description:
      $(".product_page #product_description").next("p").text().trim() || null,
    source_page: sourcePage,
    fetched_at: new Date().toISOString(),
  };
};
