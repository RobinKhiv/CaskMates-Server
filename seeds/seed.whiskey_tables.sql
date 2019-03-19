BEGIN;

TRUNCATE
  whiskey_reviews,
  whiskey,
  whiskey_users
  RESTART IDENTITY CASCADE;

INSERT INTO whiskey_users (user_name, full_name, nickname, password)
VALUES
  ('dunder', 'Dunder Mifflin', null, 'password'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', '$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK'),
  ('s.smith', 'Sam Smith', 'Sam', '$2a$12$/4P5/ylaB7qur/McgrEKwuCy.3JZ6W.cRtqxiJsYCdhr89V4Z3rp.'),
  ('lexlor', 'Alex Taylor', 'Lex', '$2a$12$Hq9pfcWWvnzZ8x8HqJotveRHLD13ceS7DDbrs18LpK6rfj4iftNw.'),
  ('wippy', 'Ping Won In', 'Ping', '$2a$12$ntGOlTLG5nEXYgDVqk4bPejBoJP65HfH2JEMc1JBpXaVjXo5RsTUu');

INSERT INTO whiskey (title, image, user_id, content, nose, palate, origin)
VALUES
  ('Jameson', 'https://loremflickr.com/750/300/landscape?random=1', 1, 'irish drink', 'smell', 'tastee', 'Ireland'),
  ('Jamesono', 'https://loremflickr.com/750/300/landscape?random=1', 2, 'irish drink', 'smell', 'tastee', 'Ireland'),
  ('Jamesone', 'https://loremflickr.com/750/300/landscape?random=1', 3, 'irish drink', 'smell', 'tastee', 'Ireland'),
 

INSERT INTO whiskey_reviews (
  aditional_comments, nose, palate,
  rating,
  whiskey_id,
  user_id
) VALUES
  (
    'This thing is amazing.',
    'smell ya later',
    'taste ya later'
    4,
    1,
    2
  ),
  (
    'This thing is amazing.',
    'smell ya later',
    'taste ya later'
    4,
    1,
    1
  ),
  (
    'This thing is amazing.',
    'smell ya later',
    'taste ya later'
    4,
    1,
    3
  ),
  (
    'This thing is amazing.',
    'smell ya later',
    'taste ya later'
    4,
    2,
    2
  )
 

COMMIT;