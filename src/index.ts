import { fetchCataloguePage } from "./catalogue/fetch.ts";
import { parsePage } from "./catalogue/parse.ts";
import { fetchBookDetails } from "./books/fetch.ts";
import type { BookDetails } from "./books/types.ts";
import { recordReport, recordToFile } from "./record.ts";

const CATALOGUE_START = "https://books.toscrape.com/catalogue/page-1.html";
const MAX_PAGES = 3;

const discoverBooks = async (): Promise<{
  pagesCount: number;
  discoveredCount: number;
  bookSources: Map<string, string>;
}> => {
  let pagesCount = 0;
  let discoveredCount = 0;

  const bookSources = new Map<string, string>();
  let currentUrl: string | null = CATALOGUE_START;

  while (currentUrl && pagesCount < MAX_PAGES) {
    try {
      const htmlString = await fetchCataloguePage(currentUrl);
      const { bookUrls, nextPageUrl } = parsePage(htmlString, currentUrl);

      pagesCount++;
      discoveredCount += bookUrls.length;

      for (const bookUrl of bookUrls) {
        if (!bookSources.has(bookUrl)) {
          bookSources.set(bookUrl, currentUrl);
        }
      }

      currentUrl = nextPageUrl;
    } catch (err) {
      await recordReport("failedPages", 1);
    }
  }

  return { pagesCount, discoveredCount, bookSources };
};

const fetchAllBookDetails = async (
  bookSources: Map<string, string>,
): Promise<BookDetails[]> => {
  const records: BookDetails[] = [];

  for (const [bookUrl, sourcePage] of bookSources) {
    try {
      const record = await fetchBookDetails(bookUrl, sourcePage);
      records.push(record);
    } catch (err) {
      console.error(`Skipped ${bookUrl}: ${(err as Error).message}`);
    }
  }

  return records;
};

const main = async () => {
  const startTime = Date.now();
  await recordReport("startTime", new Date(startTime).toISOString(), {
    add: false,
    new: true,
  });

  const { pagesCount, discoveredCount, bookSources } = await discoverBooks();
  const records = await fetchAllBookDetails(bookSources);

  console.log(`\ncatalogue_pages=${pagesCount}`);
  console.log(`discovered=${discoveredCount}`);
  console.log(`unique_urls=${bookSources.size}`);
  console.log(`detail_pages=${records.length}`);
  console.log(records[0]);

  records.push({ product_url: "https://tite.com" } as BookDetails);

  await recordToFile(records);

  await recordReport("duration", Date.now() - startTime, {
    add: false,
  });
};

main();
