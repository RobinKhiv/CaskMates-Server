BEGIN;

TRUNCATE
  whiskey_reviews,
  user_list,
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
  ('Macallan: Rare Cask', 'https://img.thewhiskyexchange.com/900/macob.non66.jpg', 'Scotland', 43, 299.99,
   'Macallan Rare Cask is comprised of 16 different sherry-cask styles, the majority of which are first fill. Rich and complex with notes of dark honey and dried fruit, this bridges the gap between The 1824 Series and The 1824 Collection.', 
   'Soft notes of opulent vanilla and raisin give way to a sweet ensemble of apple, lemon, and orange. All balanced by a spicy quartet of root ginger, cinnamon, nutmeg and clove.', 'This spicy quartet are unwavering. Oak resonates, timeless, polished and rich. Vanilla and chocolate lead the finale along with a light citrus zest.',
   'Warming and woody.', 1  ),
  ('Macallan: SHERRY OAK 12 YEARS OLD', 'https://img.thewhiskyexchange.com/900/macob.12yo.jpg', 'Scotland', 40, 54.99, 
  'The Macallan Sherry Oak 12 Years Old forms part of our Sherry Oak range which features a series of single malt whiskies matured exclusively in hand-picked sherry seasoned oak casks from Jerez for richness and complexity. A matured character, the 12 Years Old delivers rich wood spice and dried fruits and a natural rich gold color.', 
  'Complex with hints of vanilla.', 'Smooth, medium balanced with fruit, oak and spice.', 
  'Long with sweet dried fruits, oak and spice.', 2 ),
  ('WhistlePig: The Boss Hog IV', 'https://38885630uj9v2zfzvs26cy2j-wpengine.netdna-ssl.com/wp-content/uploads/2018/09/WhistlePig-The-Boss-Hog-V-The-Spirit-of-Mauve.jpg', 'Canada', 40.2, 299.99,
   'This 5th. edition of The Boss Hog, The Spirit of Mauve, is a 13 Year Straight Rye Whiskey finished in Calvados Casks in honor of our celebrity pet pig, Mauve’s undying love of apples. The result is extraordinary. A unique blend of sweet and spiced flavors with a fine balance between American power and French sophistication. There’s nothing else like it.', 
   'Mulled cider, cardamom, candied ginger and a touch of piper tobacco. Caramel, vanilla and gentle Rye spice develops with time in the glass.', 
   'Maple syrup and pears are balanced by dark chocolate and French oak spice. With water, the spice moves front and center and a vibrant, fruit-forward character develops.', 
   'Lasting spice and a touch of charred oak and caramel, maple syrup lingers as the finish fades.', 1 );

INSERT INTO user_list (whiskey_id, user_id, list_id)
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
 tasting,
  whiskey_id,
  user_id
) VALUES
  (
    4,
    'The initial taste is rough but it smooths out at the end',

    1,
    2
  ),
  (
    4,
    'Yum. Delicious. I loved this. Big, brash, and shameless in flavor profile and price. I wanted a little bit more in the finish, but for a complaint, that’s reaching. If money is no object, go forth and pillage!',
    3,
    1
  ),
  (
    4,
    'So good! Happy to have tried it. Everything about this is excellent. Lusciously spicy and deep. Fascinatingly complex. Try it if you chance, I say! Understandably, it quite expensive especially compared with previous releases. Right up there with the best of the Boss Hogs and MGP ryes. Did I mention it was delicious?',
    3,
    3
  );
 
COMMIT;