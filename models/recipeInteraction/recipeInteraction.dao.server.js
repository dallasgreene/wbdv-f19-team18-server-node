const mongoose = require('mongoose');
const recipeInteractionSchema = require('./recipeInteraction.schema.server');
const recipeIntModel = mongoose.model('RecipeInteractionModel', recipeInteractionSchema);

const findAllRecipeInts = () => {
    return recipeIntModel.find();
};

const findRecipeIntById = recipeIntId => {
    return recipeIntModel.findById(recipeIntId);
};

const findInteractionForRecipeId = recipeId => {
    return recipeIntModel.findOne({ recipe: recipeId });
};

const createRecipeInt = recipeInteraction => {
    return recipeIntModel.create(recipeInteraction);
};

const updateRecipeInt = (recipeIntId, recipeInteraction) => {
    return recipeIntModel.updateOne({ _id: recipeIntId }, { $set: recipeInteraction })
        .then(() => findRecipeIntById(recipeIntId))
        .catch(() => { return { status: "incorrect recipeInteraction id" } });
};

const deleteRecipeInt = recipeIntId => {
    return recipeIntModel.deleteOne({ _id: recipeIntId })
        .then(() => findAllRecipeInts())
        .catch(() => { return { status: "incorrect recipeInteraction id" } });
};

module.exports = {
    findAllRecipeInts,
    findRecipeIntById,
    findInteractionForRecipeId,
    createRecipeInt,
    updateRecipeInt,
    deleteRecipeInt
};