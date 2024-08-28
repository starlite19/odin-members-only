const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS status (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) NOT NULL,
  UNIQUE (name)
);

INSERT INTO status (name) 
VALUES
  ('Non-member'),
  ('Member');

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL,
  email VARCHAR (255) NOT NULL,
  status_id INTEGER NOT NULL,
  UNIQUE (email),
  FOREIGN KEY (status_id) REFERENCES status(id)
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  title VARCHAR (255),
  time TIMESTAMP,
  text TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://houangiv:peace1@localhost:5432/clubhouse",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
