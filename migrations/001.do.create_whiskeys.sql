CREATE TABLE whiskey (
  id SERIAL PRIMARY KEY,
  image TEXT,
  title TEXT NOT NULL,
  content TEXT,
  price integer,
  abv integer,
  nose text,
  palate text,
  finish text,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);