CREATE TABLE whiskey (
  id SERIAL PRIMARY KEY,
  whiskey_name TEXT NOT NULL,
  image TEXT,
  origin text,
  abv decimal(5,2),
  price money,
  content TEXT,
  nose text,
  palate text,
  finish text,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE whiskey_list (
  id SERIAL PRIMARY KEY, 
  list_name TEXT NOT NUll
)