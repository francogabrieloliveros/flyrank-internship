import { writeFile, readFile, access } from "fs/promises";

const fileExists = async (path: String): Promise<Boolean> => {
  try {
    await access(path);
    return true;
  } catch (err) {
    return false;
  }
};

const fetchBooks = async (page: Number): Promise<String> => {
  try {
    const path = `cache/catalogue-page-${page}.html`;
    if (await fileExists(path)) {
      const cached = await readFile(path, "utf-8");
      console.log("CACHE HIT");
      return cached;
    }

    const res = await fetch(
      `https://books.toscrape.com/catalogue/page-${page}.html`,
      {
        headers: {
          "user-agent":
            "FlyRankInternship-A9/1.0 https://github.com/francogabrieloliveros/flyrank-internship/tree/backend-ai-engineering/week5/the-polite-scraper",
        },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!res.ok) {
      throw new Error(res.status.toString());
    }

    console.log("FETCH");
    const html = await res.text();
    await writeFile(path, html, "utf-8");
    return html;
  } catch (err) {
    console.error(err);
  }
};

fetchBooks(1);
