import db from "./db.ts";

db.exec(
  `
  INSERT INTO tasks (title, done) VALUES
    ('Finish BE-01', 1),
    ('Finish FL-03', 0),
    ('Feed the dog', 0);
  `,
);
