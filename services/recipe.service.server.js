const recipeDAO = require('../models/recipe/recipe.dao.server');

module.exports = app => {
    app.get("/api/recipes", (req, res) => {
        if (req.query === {}) {
            recipeDAO.searchRecipeByTitle(req.query.title)
                .then(response => res.json(response));
        } else {
            recipeDAO.findAllRecipes()
                .then(response => res.json(response));
        }
    });

    app.get("/api/recipes/:recipeId", (req, res) => {
        const recipeId = req.params.recipeId;
        recipeDAO.findRecipeById(recipeId)
            .then(response => res.json(response));
    });

    app.post("/api/recipes", (req, res) => {
        const recipe = req.body;
        recipeDAO.createRecipe(recipe)
            .then(response => res.json(response));
    });

    app.put("/api/recipes/:recipeId", (req, res) => {
        const recipeId = req.params.recipeId;
        const recipe = req.body;
        recipeDAO.updateRecipe(recipeId, recipe)
            .then(response => res.json(response));
    });

    app.delete("/api/recipes/:recipeId", (req, res) => {
        const recipeId = req.params.recipeId;
        recipeDAO.deleteRecipe(recipeId)
            .then(response => res.json(response));
    });
};