BEGIN;

TRUNCATE
  whiskey_reviews,
  whiskey,
  whiskey_users
  RESTART IDENTITY CASCADE;

INSERT INTO whiskey_users (user_name, full_name, nickname, password)
VALUES
  ('dunder', 'Dunder Mifflin', null, '$2a$12$yUr39tJDoyPAPFzVMjxxI.v3YJlVJQW8nosfS8psRlXF./WK63XwK'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', '$2a$12$yUr39tJDoyPAPFzVMjxxI.v3YJlVJQW8nosfS8psRlXF./WK63XwK'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', '$2a$12$yUr39tJDoyPAPFzVMjxxI.v3YJlVJQW8nosfS8psRlXF./WK63XwK'),
  ('s.smith', 'Sam Smith', 'Sam', '$2a$12$yUr39tJDoyPAPFzVMjxxI.v3YJlVJQW8nosfS8psRlXF./WK63XwK'),
  ('lexlor', 'Alex Taylor', 'Lex', '$2a$12$yUr39tJDoyPAPFzVMjxxI.v3YJlVJQW8nosfS8psRlXF./WK63XwK'),
  ('wippy', 'Ping Won In', 'Ping', '$2a$12$yUr39tJDoyPAPFzVMjxxI.v3YJlVJQW8nosfS8psRlXF./WK63XwK');

INSERT INTO whiskey (title, image, origin, abv, price, content, nose, palate, finish,  user_id)
VALUES
  ('Jameson', 'https://loremflickr.com/750/300/landscape?random=1', 'Ireland', 40.2, 19.99, 'irish drink', 'smell', 'tastee','rough', 1  ),
  ('Jamesono', 'https://loremflickr.com/750/300/landscape?random=1', 'Ireland', 40.2, 19.99, 'irish drink', 'smell', 'tastee', 'girly', 2  ),
  ('Jamesone', 'https://loremflickr.com/750/300/landscape?random=1', 'Ireland', 40.2, 19.99, 'irish drink', 'smell', 'tastee', 'like posion', 1  );
 

INSERT INTO whiskey_reviews (
  rating,
  nose, 
  palate,
  additional_comments, 
  whiskey_id,
  user_id
) VALUES
  (
    4,
    'smell ya later',
    'taste ya later',
    'This thing is amazing.',
    1,
    2
  ),
  (
    4,
    'smell ya later',
    'taste ya later',
    'This thing is amazing.',
    1,
    1
  ),
  (
    4,
    'smell ya later',
    'taste ya later',
    'This thing is amazing.',
    1,
    3
  );
 

 

COMMIT;