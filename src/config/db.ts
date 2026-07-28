import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("./tasks.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(
  `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL
  );
 `,
);

export default db;
