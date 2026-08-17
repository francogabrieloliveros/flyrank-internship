import { appendFile, mkdir, readFile, rm, writeFile } from "fs/promises";
import { type BookDetails } from "./books/types.ts";
import { fileExists } from "./cache.ts";
import {
  BookDetailsSchema,
  type ValidatedBookDetails,
} from "./books/schema.ts";
import path from "path";

const OUTPUT_DIR = "output";
const BOOKS_PATH = path.join(OUTPUT_DIR, "books.json");
const ERRORS_PATH = path.join(OUTPUT_DIR, "errors.json");
const REPORT_PATH = path.join(OUTPUT_DIR, "run-report.json");

export const recordToFile = async (
  bookDetails: BookDetails[],
): Promise<void> => {
  if (!(await fileExists(OUTPUT_DIR))) {
    mkdir(OUTPUT_DIR, { recursive: true });
  }

  const currBooks: Record<string, ValidatedBookDetails> = {};

  if (await fileExists(BOOKS_PATH)) {
    const prevBooksFile = await readFile(BOOKS_PATH, "utf-8");
    const prevBooks = JSON.parse(prevBooksFile);

    for (const [url, book] of Object.entries(prevBooks)) {
      currBooks[url] = book as ValidatedBookDetails;
    }
  }

  for (const bookDetail of bookDetails) {
    try {
      const validated: ValidatedBookDetails =
        BookDetailsSchema.parse(bookDetail);
      if (!(validated.product_url in currBooks)) {
        currBooks[validated.product_url] = validated;
      }

      await recordReport("validRecords", 1);
    } catch (err) {
      const errMessage = (err as Error).message;
      await recordReport("invalidRecords", 1);
      await appendFile(
        ERRORS_PATH,
        `"${bookDetail.product_url}": ${errMessage}`,
      );
    }
  }

  await writeFile(BOOKS_PATH, JSON.stringify(currBooks));
};

let reportQueue: Promise<void> = Promise.resolve();

type RecordReportOptions = {
  add?: boolean;
  new?: boolean;
};

export const recordReport = async (
  key: string,
  val: number | string,
  option: RecordReportOptions = {},
) => {
  const { add = true, new: isNew = false } = option;

  const run = reportQueue.then(async () => {
    if (!(await fileExists(OUTPUT_DIR))) {
      mkdir(OUTPUT_DIR, { recursive: true });
    }

    if (await fileExists(REPORT_PATH)) {
      if (isNew) {
        rm(REPORT_PATH);
        writeFile(REPORT_PATH, "{}");
      }

      const reportText = await readFile(REPORT_PATH, "utf-8");
      const report = JSON.parse(reportText);

      if (Object.hasOwn(report, key)) {
        report[key] = add ? report[key] + val : val;
      } else {
        report[key] = val;
      }

      await writeFile(REPORT_PATH, JSON.stringify(report));
    } else {
      const report: Record<string, any> = {};
      report[key] = val;

      await writeFile(REPORT_PATH, JSON.stringify(report));
    }
  });

  reportQueue = run.then(
    () => undefined,
    () => undefined,
  );

  return run;
};
