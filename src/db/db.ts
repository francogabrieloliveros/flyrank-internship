// import Database from "better-sqlite3";
// import { existsSync } from "fs";
// import path from "path";

// const dbPath = path.resolve("./tasks.db");
// const dbExists = existsSync(dbPath);

// const db = new Database(dbPath);
// db.pragma("journal_mode = WAL");

// if (!dbExists) {
//   db.exec(
//     `
//     CREATE TABLE IF NOT EXISTS tasks (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       title TEXT NOT NULL,
//       done BOOLEAN NOT NULL
//     );
//    `,
//   );

//   db.exec(
//     `
//     INSERT INTO tasks (title, done) VALUES
//       ('Finish BE-01', 1),
//       ('Finish FL-03', 0),
//       ('Feed the dog', 0);
//     `,
//   );
// }
// export default db;

import { Client } from "pg";
import { loadEnvFile } from "node:process";

loadEnvFile();

const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString });
await client.connect();

const { rows } = await client.query(`
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'tasks'
  );
`);

await client.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL
  );
`);

// Only seed data if table did not exist
if (!rows[0].exists) {
  await client.query(`
  INSERT INTO tasks (title, done) VALUES
    ('Finish BE-01', TRUE),
    ('Finish FL-03', FALSE),
    ('Feed the dog', FALSE);
`);
}

export default client;
