// server.js

const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// mysql pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
});

// home
app.get("/", (req, res) => {
  res.render("home");
});

// recipes grouped
app.get("/recipes", async (req, res) => {
  try {
    const [recipes] = await pool.query(
      "SELECT id, title, protein_type FROM recipes ORDER BY protein_type, title;"
    );

    const groupedMap = {};
    for (const r of recipes) {
      if (!groupedMap[r.protein_type]) groupedMap[r.protein_type] = [];
      groupedMap[r.protein_type].push({ id: r.id, title: r.title });
    }

    const groupedRecipes = Object.keys(groupedMap).map((category) => ({
      category,
      items: groupedMap[category],
    }));

    res.render("recipes", { groupedRecipes });
  } catch (err) {
    res.status(500).send("DB error: " + err.message);
  }
});

// recipe details
app.get("/recipes/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;

    const [recipeRows] = await pool.query("SELECT * FROM recipes WHERE id = ?", [
      recipeId,
    ]);

    if (recipeRows.length === 0) {
      return res.status(404).send("Recipe not found");
    }

    const recipe = recipeRows[0];

    const [ingredients] = await pool.query(
      `
      SELECT ingredients.id, ingredients.name
      FROM recipe_ingredients
      JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id
      WHERE recipe_ingredients.recipe_id = ?
      `,
      [recipeId]
    );

    res.render("recipe", { recipe, ingredients });
  } catch (err) {
    res.status(500).send("DB error: " + err.message);
  }
});

// ingredient hover api
app.get("/api/ingredients/:id", async (req, res) => {
  try {
    const ingredientId = req.params.id;

    const [rows] = await pool.query(
      "SELECT id, name, info FROM ingredients WHERE id = ?",
      [ingredientId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Ingredient not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// add recipe form
app.get("/add-recipe", async (req, res) => {
  try {
    const [ingredients] = await pool.query(
      "SELECT id, name FROM ingredients ORDER BY name;"
    );
    res.render("add-recipe", { ingredients });
  } catch (err) {
    res.status(500).send("DB error: " + err.message);
  }
});

// add recipe submit
app.post("/add-recipe", async (req, res) => {
  try {
    const title = req.body.title;
    const proteinType = req.body.protein_type;
    const instructions = req.body.instructions;

    let ingredientIds = req.body.ingredient_ids || [];
    if (!Array.isArray(ingredientIds)) ingredientIds = [ingredientIds];

    const newIngName = (req.body.new_ingredient_name || "").trim();
    const newIngInfo = (req.body.new_ingredient_info || "").trim();

    if (!title || !proteinType || !instructions) {
      return res.status(400).send("Missing required fields.");
    }

    if (newIngName.length > 0) {
      const [ingResult] = await pool.query(
        "INSERT INTO ingredients (name, info) VALUES (?, ?)",
        [newIngName, newIngInfo || null]
      );

      ingredientIds.push(String(ingResult.insertId));
    }

    if (ingredientIds.length === 0) {
      return res
        .status(400)
        .send("Select at least one ingredient or add a new ingredient.");
    }

    const [result] = await pool.query(
      "INSERT INTO recipes (title, protein_type, instructions) VALUES (?, ?, ?)",
      [title, proteinType, instructions]
    );

    const newRecipeId = result.insertId;

    const values = ingredientIds.map((ingId) => [newRecipeId, Number(ingId)]);
    await pool.query(
      "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ?",
      [values]
    );

    res.redirect(`/recipes/${newRecipeId}`);
  } catch (err) {
    res.status(500).send("DB error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});