const mongoose = require('mongoose');
const recipeSchema = require('./recipe.schema.server');
const recipeModel = mongoose.model('RecipeModel', recipeSchema);

const findAllRecipes = () => {
    return recipeModel.find({ }, 'title image servings readyInMinutes');
};

const findRecipeById = recipeId => {
    return recipeModel.findById(recipeId)
        .populate('interactions', 'likedBy comments');
};

const createRecipe = recipe => {
    return recipeModel.create(recipe);
};

const updateRecipe = (recipeId, recipe) => {
    return recipeModel.updateOne({ _id: recipeId }, { $set: recipe })
        .then(() => findRecipeById(recipeId))
        .catch(() => { return { status: "incorrect recipe id" } });
};

const deleteRecipe = recipeId => {
    return recipeModel.deleteOne({ _id: recipeId })
        .then(() => findAllRecipes())
        .catch(() => { return { status: "incorrect recipe id" } });
};

module.exports = {
    findAllRecipes,
    findRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};