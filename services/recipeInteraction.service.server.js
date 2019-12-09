const recipeInteractionDAO = require('../models/recipeInteraction/recipeInteraction.dao.server');

module.exports = app => {
    app.get("/api/recipeInteractions", (req, res) => {
        res.json(recipeInteractionDAO.findAllRecipeInts());
    });

    app.get("/api/recipeInteractions/:recipeIntId", (req, res) => {
        const recipeIntId = req.params.recipeIntId;
        res.json(recipeInteractionDAO.findRecipeIntById(recipeIntId));
    });

    app.get("/api/recipes/:recipeId/interactions", (req, res) => {
        const recipeId = req.params.recipeId;
        res.json(recipeInteractionDAO.findInteractionForRecipeId(recipeId));
    });

    app.post("/api/recipeInteractions", (req, res) => {
        const recipeInteraction = req.body;
        res.json(recipeInteractionDAO.createRecipeInt(recipeInteraction));
    });

    app.put("/api/recipeInteractions/:recipeIntId", (req, res) => {
        const recipeIntId = req.params.recipeIntId;
        const recipeInteraction = req.body;
        res.json(recipeInteractionDAO.updateRecipeInt(recipeIntId, recipeInteraction));
    });

    app.delete("/api/recipeInteractions/:recipeIntId", (req, res) => {
        const recipeIntId = req.params.recipeIntId;
        res.json(recipeInteractionDAO.deleteRecipeInt(recipeIntId));
    });
};