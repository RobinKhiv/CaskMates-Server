BEGIN;

TRUNCATE
  whiskey_reviews,
  whiskey,
  whiskey_list,
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

INSERT INTO whiskey_list (list_name)
VALUES
  ('Favorite List'),
  ('Wish List'), 
  ('Already Tried');

INSERT INTO whiskey (whiskey_name, image, origin, abv, price, content, nose, palate, finish,  user_id)
VALUES
  ('Jameson', 'https://dydza6t6xitx6.cloudfront.net/ci-jameson-irish-whiskey-c31f346b1bd3ac77.png', 'Ireland', 40.2, 19.99, 'irish drink', 'smell', 'tastee','rough', 1  ),
  ('Macallan', 'https://loremflickr.com/750/300/landscape?random=1', 'Ireland', 40.2, 19.99, 'irish drink', 'smell', 'tastee', 'girly', 2  ),
  ('Jack Daniels', 'https://loremflickr.com/750/300/landscape?random=1', 'Ireland', 40.2, 19.99, 'irish drink', 'smell', 'tastee', 'like posion', 1  );

INSERT INTO list (whiskey_id, user_id, list_id)
VALUES
  (2, 2, 1),
  (3, 2, 1),
  (1, 2, 1),
  (3, 1, 2),
  (2, 1, 2),
  (1, 1, 3),
  (3, 2, 3),
  (1, 3, 3);



INSERT INTO whiskey_reviews (
  rating,
  nose, 
  palate,
  finish,
  additional_comments, 
  whiskey_id,
  user_id
) VALUES
  (
    4,
    'smell ya later',
    'taste ya later',
    'finished it',
    'This thing is amazing.',
    1,
    2
  ),
  (
    4,
    'smell ya later',
    'taste ya later',
    'finished it',
    'This thing is amazing.',
    1,
    1
  ),
  (
    4,
    'smell ya later',
    'taste ya later',
    'finished it',
    'This thing is amazing.',
    1,
    3
  );
 

 

COMMIT;