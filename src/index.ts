import * as cheerio from "cheerio";
import { setTimeout } from "timers/promises";
import { writeFile, readFile, access, mkdir } from "fs/promises";

const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch (err) {
    return false;
  }
};

const getPageFile = (pageUrl: string): string => {
  // Filter page file from url
  // Default to index.html if pageFile not in url
  return (
    pageUrl
      .split("/")
      .filter((str) => str !== "")
      .pop() || "index.html"
  );
};

const fetchPage = async (pageUrl: string): Promise<string> => {
  const pageFile = getPageFile(pageUrl);
  const path = `cache/catalogue-${pageFile}`;

  // Use cache if it exists
  if (await fileExists(path)) {
    return await readFile(path, "utf-8");
  }

  // Fetch with a timeout of 5 secs
  const res = await fetch(pageUrl, {
    headers: {
      "user-agent":
        "FlyRankInternship-A9/1.0 https://github.com/francogabrieloliveros/flyrank-internship/tree/backend-ai-engineering/week5/the-polite-scraper",
    },
    signal: AbortSignal.timeout(5000),
  });

  // Only parse on status 200
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  // Store the received html as cached text
  const html = await res.text();
  await mkdir("cache", { recursive: true });
  await writeFile(path, html, "utf-8");

  // Polite delay
  await setTimeout(500);
  return html;
};

interface ScrapingResult {
  bookUrls: string[];
  nextPageUrl: string | null;
}

const parsePage = (htmlString: string, currentUrl: string): ScrapingResult => {
  const $ = cheerio.load(htmlString);
  const urlPrefix = currentUrl.replace(getPageFile(currentUrl), "");

  const bookUrls: string[] = [];
  $(".product_pod h3 a").each((_, element) => {
    const href = $(element).attr("href");
    if (href) {
      const fullUrl = new URL(href, urlPrefix).href;
      bookUrls.push(fullUrl);
    }
  });

  const nextRelUrl = $(".next a").attr("href");
  const nextPageUrl = nextRelUrl ? new URL(nextRelUrl, currentUrl).href : null;

  return { bookUrls, nextPageUrl };
};

const main = async () => {
  let pagesCount = 0;
  let discoveredCount = 0;
  const uniqueUrls = new Set<string>();

  let currentUrl: string | null =
    "https://books.toscrape.com/catalogue/page-1.html";

  while (currentUrl && pagesCount < 3) {
    const htmlString = await fetchPage(currentUrl);
    const { bookUrls, nextPageUrl } = parsePage(htmlString, currentUrl);

    pagesCount++;
    discoveredCount += bookUrls.length;
    bookUrls.forEach((url) => uniqueUrls.add(url));

    currentUrl = nextPageUrl;
  }

  console.log(`catalogue_pages=${pagesCount}`);
  console.log(`discovered=${discoveredCount}`);
  console.log(`unique_urls=${uniqueUrls.size}`);
};

main();
