import { appendFile, mkdir, readFile, writeFile } from "fs/promises";
import { type BookDetails } from "./books/types.ts";
import { fileExists } from "./cache.ts";
import {
  BookDetailsSchema,
  type ValidatedBookDetails,
} from "./books/schema.ts";
import path from "path";

const OUTPUT_DIR = "outputs";
const BOOKS_PATH = path.join(OUTPUT_DIR, "books.json");
const ERRORS_PATH = path.join(OUTPUT_DIR, "errors.json");

export const recordToFile = async (
  bookDetails: BookDetails[],
): Promise<void> => {
  if (!(await fileExists(OUTPUT_DIR))) {
    mkdir(OUTPUT_DIR, { recursive: true });
  }

  const currBooks: Record<string, ValidatedBookDetails> = {};

  if (await fileExists(BOOKS_PATH)) {
    const prevBooksFile = await readFile(BOOKS_PATH, "utf-8");
    const prevBooks = JSON.parse(prevBooksFile) as ValidatedBookDetails[];
    prevBooks.forEach((prevBook) => {
      Object.assign(currBooks, prevBook);
    });
  }

  bookDetails.forEach(async (bookDetail) => {
    try {
      const validated: ValidatedBookDetails =
        BookDetailsSchema.parse(bookDetail);
      if (!(validated.product_url in currBooks)) {
        currBooks[validated.product_url] = validated;
      }
    } catch (err) {
      const errMessage = (err as Error).message;
      await appendFile(
        "outputs/errors.json",
        `"${bookDetail.product_url}": ${errMessage}`,
      );
    }
  });

  await writeFile("outputs/records.json", JSON.stringify(currBooks));
};
