# JZCcsci-3321-SP26-hw2-recipes

Full-stack Recipe Web Application built with Node.js, Express, MySQL, and EJS.

---

## Overview

This project is a dynamic full-stack recipe web application that allows users to view, create, and manage recipes stored in a MySQL relational database. The application features a custom pink-themed design with a centered beige layout and interactive ingredient hover tooltips.

Users can browse recipes grouped by category (protein_type), click individual recipes to view details, and add new recipes through a form. If an ingredient does not already exist, users can create it directly when submitting a new recipe.

---

## Features

Home Page (/)

* Displays personal introduction: “Hello, my name is Joauna Zahn Carter!”
* Favorite food section (Raspberries)
* Personal cooking experience description
* Pink background with centered beige content layout
* Navigation bar across all pages

Recipes Page (/recipes)

* Displays recipes grouped dynamically by category (protein_type)
* Categories displayed in a 3-column grid layout
* Each recipe links to its detail page

Recipe Detail Page (/recipes/:id)

* Displays recipe title
* Displays category
* Displays ingredients
* Displays instructions (only if present)
* Hovering over an ingredient shows additional information using AJAX and client-side JavaScript

Add Recipe Page (/add-recipe)

* Form to create new recipes
* Enter recipe title
* Enter category
* Enter instructions
* Select one or more existing ingredients
* Optionally create a new ingredient with description
* Inserts into recipes, ingredients (if needed), and recipe_ingredients
* Redirects to the newly created recipe page

---

## Database Structure

The application uses a relational database with a many-to-many relationship between recipes and ingredients.

Tables:

recipes

* id (Primary Key)
* title
* protein_type
* instructions

ingredients

* id (Primary Key)
* name
* info

recipe_ingredients

* recipe_id (Foreign Key)
* ingredient_id (Foreign Key)
* Composite Primary Key (recipe_id, ingredient_id)

Foreign keys use ON DELETE CASCADE to maintain referential integrity.

The SQL setup file is located at:
db/schema.sql

---

## Installation & Setup

1. Clone the repository

git clone [https://github.com/YOUR_USERNAME/JZCcsci-3321-SP26-hw2-recipes.git](https://github.com/YOUR_USERNAME/JZCcsci-3321-SP26-hw2-recipes.git)
cd JZCcsci-3321-SP26-hw2-recipes

2. Install dependencies

npm install

3. Configure environment variables

Create a file named .env in the project root with:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=recipe_app
DB_PORT=3306

Note: The .env file is ignored by Git and should not be committed.

4. Set up the database

Open MySQL Workbench and run:

db/schema.sql

This will create and populate the database.

5. Start the server

node server.js

Then visit:

[http://localhost:3000/](http://localhost:3000/)

---

## Technologies Used

* Node.js
* Express
* MySQL2
* EJS
* Vanilla JavaScript (AJAX + hover tooltips)
* CSS (custom pink and beige theme)
* dotenv (environment variable management)

---

## Security Notes

* The .env file is excluded using .gitignore
* Database credentials are never committed
* All SQL queries use parameterized statements to prevent SQL injection

---

## Author

Joauna Zahn Carter
CSCI 3321
Spring 2026
