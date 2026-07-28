import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("./tasks.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

export default db;
