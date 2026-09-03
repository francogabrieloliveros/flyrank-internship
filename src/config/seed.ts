import Database from "better-sqlite3";
import path from "path";
import books from "../../books.json";
import { RATING_MAP } from "@/config/config";

const dbPath = path.resolve("./report.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    price REAL,
    rating INTEGER,
    url TEXT
  );
`);
db.exec("DELETE FROM books;");
db.exec("DELETE FROM sqlite_sequence WHERE name = 'books';");

const insert = db.prepare(
  "INSERT INTO books (title, price, rating, url) VALUES (?, ?, ?, ?)",
);

Object.values(books).forEach((book) => {
  insert.run(
    book.title,
    book.price_gbp,
    RATING_MAP[book.rating_text],
    book.product_url,
  );
});

export default db;
