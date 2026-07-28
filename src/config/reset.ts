import db from "./db.ts";

db.exec(
  `
  DROP TABLE IF EXISTS tasks;

  CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL
  );
 `,
);
