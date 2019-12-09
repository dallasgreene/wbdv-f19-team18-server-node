const recipeInteractionDAO = require('../models/recipeInteraction/recipeInteraction.dao.server');

module.exports = app => {
    app.get("/api/recipeInteractions", (req, res) => {
        recipeInteractionDAO.findAllRecipeInts()
            .then(response => res.json(response));
    });

    app.get("/api/recipeInteractions/:recipeIntId", (req, res) => {
        const recipeIntId = req.params.recipeIntId;
        recipeInteractionDAO.findRecipeIntById(recipeIntId)
            .then(response => res.json(response));
    });

    app.get("/api/recipes/:recipeId/interactions", (req, res) => {
        const recipeId = req.params.recipeId;
        recipeInteractionDAO.findInteractionForRecipeId(recipeId)
            .then(response => res.json(response));
    });

    app.post("/api/recipeInteractions", (req, res) => {
        const recipeInteraction = req.body;
        recipeInteractionDAO.createRecipeInt(recipeInteraction)
            .then(response => res.json(response));
    });

    app.put("/api/recipeInteractions/:recipeIntId", (req, res) => {
        const recipeIntId = req.params.recipeIntId;
        const recipeInteraction = req.body;
        recipeInteractionDAO.updateRecipeInt(recipeIntId, recipeInteraction)
            .then(response => res.json(response));
    });

    app.delete("/api/recipeInteractions/:recipeIntId", (req, res) => {
        const recipeIntId = req.params.recipeIntId;
        recipeInteractionDAO.deleteRecipeInt(recipeIntId)
            .then(response => res.json(response));
    });
};