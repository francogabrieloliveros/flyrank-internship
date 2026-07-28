import Database from "better-sqlite3";
import { existsSync } from "fs";
import path from "path";

const dbPath = path.resolve("./tasks.db");
const dbExists = existsSync(dbPath);

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

if (!dbExists) {
  db.exec(
    `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL
    );
   `,
  );

  db.exec(
    `
    INSERT INTO tasks (title, done) VALUES
      ('Finish BE-01', 1),
      ('Finish FL-03', 0),
      ('Feed the dog', 0);
    `,
  );
}
export default db;
