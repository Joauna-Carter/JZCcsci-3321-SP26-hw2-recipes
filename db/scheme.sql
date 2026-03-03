DROP DATABASE IF EXISTS recipe_app;
CREATE DATABASE recipe_app;
USE recipe_app;

CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  protein_type VARCHAR(100) NOT NULL,
  instructions TEXT NOT NULL
);

CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  info TEXT
);

CREATE TABLE recipe_ingredients (
  recipe_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

INSERT INTO ingredients (name, info) VALUES
('Bacon', 'Cook until browned; handle raw pork safely.'),
('Eggs', 'Refrigerate; cook until set to reduce foodborne risk.'),
('Potatoes', 'Scrub/peel; avoid green parts (solanine).'),
('Salt', 'Boosts flavor; a little goes a long way.'),
('Black Pepper', 'Adds mild heat; freshly ground is stronger.'),
('Lawry''s Seasoned Salt', 'Seasoning blend; start small and taste.'),
('Cooking Oil', 'Hot oil can splatter—use medium heat and dry foods.'),
('Spaghetti Pasta', 'Stir early so it does not stick; salt the water.'),
('Marinara Sauce', 'Tomato-based sauce; simmering deepens flavor.'),
('Chicken', 'Cook to 165°F (74°C); avoid cross-contamination.'),
('Flour', 'Coating for breading; helps create crisp texture.'),
('Breadcrumbs', 'Crispy coating; panko gives extra crunch.'),
('Hot Dog', 'Pre-cooked; heat through and serve.'),
('Hot Dog Bun', 'Toasting helps prevent sogginess.'),
('Raspberries', 'Wash gently; mash for quick jam-style spread.'),
('Plastic Bag', 'Use a clean bag; chill after mashing if storing.');

INSERT INTO recipes (title, protein_type, instructions) VALUES
('Bacon and Eggs', 'Eggs', 'Cook bacon in a pan until browned. Scramble eggs in a bowl, then cook in a pan until set. Serve together.'),
('Fried Potatoes', 'Vegetable', 'Peel and cut potatoes. Season with salt, pepper, and Lawry''s. Fry in oil in a pan until cooked and browned.'),
('Spaghetti with Marinara', 'Grains', 'Boil spaghetti until tender. Warm marinara sauce. Drain pasta and mix with sauce.'),
('Breaded Fried Chicken', 'Chicken', 'Coat chicken in flour, then breadcrumbs. Fry in oil until cooked through and crispy (165°F / 74°C inside).'),
('Raspberry Jam', 'Fruit', 'Put raspberries in a clean plastic bag and mash well. Eat immediately or refrigerate to chill.'),
('Hot Dogs', 'Pork', 'Boil hot dogs in water until heated through. Put in bun and serve.');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(1, 1), (1, 2),
(2, 3), (2, 4), (2, 5), (2, 6), (2, 7),
(3, 8), (3, 9),
(4, 10), (4, 11), (4, 12), (4, 7),
(5, 15), (5, 16),
(6, 13), (6, 14);