const mongoose = require('mongoose');
const recipeSchema = require('./recipe.schema.server');
const recipeModel = mongoose.model('RecipeModel', recipeSchema);
const recipeIntDAO = require('../recipeInteraction/recipeInteraction.dao.server');

const recipePopulationSpecs = {
    path: 'interactions',
    select: 'likedBy comments',
    populate: {
        path: 'likedBy comments',
        select: '_id username children title postedBy body',
        populate: {
            path: 'postedBy children',
            select: '_id username firstName lastName children title postedBy body',
            populate: {
                path: 'postedBy children',
                select: '_id username firstName lastName children title postedBy body',
                populate: {
                    path: 'postedBy children',
                    select: '_id username firstName lastName children title postedBy body',
                    populate: {
                        path: 'postedBy children',
                        select: '_id username firstName lastName children title postedBy body',
                        populate: {
                            path: 'postedBy children',
                            select: '_id username firstName lastName children title postedBy body',
                            populate: {
                                path: 'postedBy children',
                                select: '_id username firstName lastName children title postedBy body',
                                populate: {
                                    path: 'postedBy children',
                                    select: '_id username firstName lastName children title postedBy body',
                                    populate: {
                                        path: 'postedBy children',
                                        select: '_id username firstName lastName children title postedBy body',
                                        populate: {
                                            path: 'postedBy children',
                                            select: '_id username firstName lastName children title postedBy body'
                                        }
                                    }
                                }
                            } // this is to force mongoose to populate up to 10 layers of comments.
                        }     // -> only used for findRecipeById in order to load all comments for
                    }         //    the detail view of the recipe.
                }
            }
        }
    }
};

const findAllRecipes = () => {
    return recipeModel.find({ }, '_id title image servings readyInMinutes');
};

const findRecipeById = recipeId => {
    return recipeModel.findById(recipeId)
        .populate(recipePopulationSpecs)
        .catch(() => { return { status: "incorrect recipe id" } });
};

const searchRecipeByTitle = title => {
    return recipeModel.find({ title: { $text: { $search: title, language: 'en' } } },
        '_id title image servings readyInMinutes')
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
    return recipeModel.findById(recipeId)
        .then(recipe => {
            recipeIntDAO.deleteRecipeInt(recipe.interactions);
            return recipeModel.deleteOne({ _id: recipeId })
                .then(() => findAllRecipes())
                .catch(() => { return { status: "incorrect recipe id" } });
        });
};

module.exports = {
    findAllRecipes,
    findRecipeById,
    searchRecipeByTitle,
    createRecipe,
    updateRecipe,
    deleteRecipe
};