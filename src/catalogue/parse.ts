import * as cheerio from "cheerio";

export interface ScrapingResult {
  bookUrls: string[];
  nextPageUrl: string | null;
}

export const parsePage = (htmlString: string, currentUrl: string): ScrapingResult => {
  const $ = cheerio.load(htmlString);

  const bookUrls: string[] = [];
  $(".product_pod h3 a").each((_, element) => {
    const href = $(element).attr("href");
    if (href) {
      bookUrls.push(new URL(href, currentUrl).href);
    }
  });

  const nextRelUrl = $(".next a").attr("href");
  const nextPageUrl = nextRelUrl ? new URL(nextRelUrl, currentUrl).href : null;

  return { bookUrls, nextPageUrl };
};
