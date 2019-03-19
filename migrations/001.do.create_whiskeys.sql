CREATE TABLE whiskey (
  id SERIAL PRIMARY KEY,
  image TEXT,
  title TEXT NOT NULL,
  content TEXT,
  price money,
  abv decimal(5,2),
  nose text,
  palate text,
  finish text,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);