import Database from "better-sqlite3";
import path from "path";
import books from "../../books.json";

const RATING_MAP = {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
};

const dbPath = path.resolve("./report.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id TEXT,
    title TEXT,
    price REAL,
    rating INTEGER,
    url TEXT
  );
`);
db.exec("DELETE FROM books;");

const insert = db.prepare(
  "INSERT INTO books (id, title, price, rating, url) VALUES (?, ?, ?, ?, ?)",
);

Object.values(books).forEach((book) => {
  insert.run(
    book.product_url,
    book.title,
    book.price_gbp,
    RATING_MAP[book.rating_text],
    book.product_url,
  );
});

export default db;
