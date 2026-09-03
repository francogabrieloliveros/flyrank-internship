import Database from "better-sqlite3";
import db from "@/config/seed";

interface BookPriceRow {
  title: string;
  price: number;
}

interface RatingCountRow {
  rating: number | null;
  count: number;
}

interface AllBooksRow {
  title: string;
  price: number;
  rating: number | null;
}

export interface ReportData {
  totalBooks: number;
  averagePrice: number;
  topExpensive: BookPriceRow[];
  booksPerRating: RatingCountRow[];
  allBooks: AllBooksRow[];
}

const getReportData = (): ReportData => {
  const totalBooks = db
    .prepare<[], { count: number }>("SELECT COUNT(*) AS count FROM books")
    .get()!.count;

  const averagePrice = db
    .prepare<[], { avg: number }>(
      "SELECT ROUND(AVG(price), 2) AS avg FROM books",
    )
    .get()!.avg;

  const topExpensive = db
    .prepare<[], BookPriceRow>(
      "SELECT title, price FROM books ORDER BY price DESC LIMIT 5",
    )
    .all();

  const booksPerRating = db
    .prepare<[], RatingCountRow>(
      "SELECT rating, COUNT(*) AS count FROM books GROUP BY rating ORDER BY rating",
    )
    .all();

  const allBooks = db
    .prepare<[], AllBooksRow>(
      "SELECT title, price, rating FROM books ORDER BY title",
    )
    .all();

  return {
    totalBooks,
    averagePrice,
    topExpensive,
    booksPerRating,
    allBooks,
  };
};

export default getReportData;
