CREATE TABLE whiskey_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  nickname TEXT,
  password TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);

ALTER TABLE whiskey
  ADD COLUMN
    user_id INTEGER REFERENCES whiskey_users(id)
    ON DELETE SET NULL;