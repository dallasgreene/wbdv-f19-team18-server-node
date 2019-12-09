const recipeDAO = require('../models/recipe/recipe.dao.server');

module.exports = app => {
    app.get("/api/recipes", (req, res) => {
        if (req.query) {
            res.json(recipeDAO.searchRecipeByTitle(req.query.title))
        } else {
            res.json(recipeDAO.findAllRecipes());
        }
    });

    app.get("/api/recipes/:recipeId", (req, res) => {
        const recipeId = req.params.recipeId;
        res.json(recipeDAO.findRecipeById(recipeId));
    });

    app.post("/api/recipes", (req, res) => {
        const recipe = req.body;
        res.json(recipeDAO.createRecipe(recipe));
    });

    app.put("/api/recipes/:recipeId", (req, res) => {
        const recipeId = req.params.recipeId;
        const recipe = req.body;
        res.json(recipeDAO.updateRecipe(recipeId, recipe));
    });

    app.delete("/api/recipes/:recipeId", (req, res) => {
        const recipeId = req.params.recipeId;
        res.json(recipeDAO.deleteRecipe(recipeId));
    });
};