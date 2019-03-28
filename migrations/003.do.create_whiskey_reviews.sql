CREATE TABLE whiskey_reviews (
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL,
    nose text,
    palate text,
    finish text,
    additional_comments text,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    whiskey_id INTEGER
        REFERENCES whiskey(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES whiskey_users(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE user_list (
  id SERIAL PRIMARY KEY,
  whiskey_id INTEGER
    REFERENCES whiskey(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER
    REFERENCES whiskey_users(id) ON DELETE CASCADE NOT NULL,
  list_id INTEGER
    REFERENCES whiskey_list(id) on DELETE CASCADE NOT NULL 
)