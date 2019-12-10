const mongoose = require('mongoose');
const recipeSchema = require('./recipe.schema.server');
const recipeModel = mongoose.model('RecipeModel', recipeSchema);
const recipeIntDAO = require('../recipeInteraction/recipeInteraction.dao.server');
const adminDAO = require('../admin/admin.dao.server');
const userDAO = require('../user/user.dao.server');

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
    return recipeModel.find({ $text: { $search: title, $language: 'en' } },
        '_id title image servings readyInMinutes')
};

const createRecipe = recipe => {
    return recipeModel.create(recipe)
        .then(response => {
            return adminDAO.updateForRecipeCreate(response.author, response._id)
                .then(() => recipeIntDAO.createRecipeInt({
                    recipe: response._id,
                    likedBy: [],
                    comments: []
                }))
                .then(recipeInt =>
                    recipeModel.updateOne({ _id: recipeInt.recipe }, { $set: { interactions: recipeInt._id } }))
                .then(() => findRecipeById(response._id));
        })
};

const updateRecipe = (recipeId, recipe) => {
    return recipeModel.updateOne({ _id: recipeId }, { $set: recipe })
        .then(() => findRecipeById(recipeId))
        .catch(() => { return { status: "incorrect recipe id" } });
};

const likeRecipe = (recipeId, userId) => {
    return recipeIntDAO.likeRecipe(recipeId, userId)
        .then(() => userDAO.updateForRecipeLike(recipeId, userId));
};

const unlikeRecipe = (recipeId, userId) => {
    return recipeIntDAO.unlikeRecipe(recipeId, userId)
        .then(() => userDAO.updateForRecipeUnlike(recipeId, userId));
};

const deleteRecipe = recipeId => {
    return recipeModel.findById(recipeId)
        .then(recipe => {
            return recipeIntDAO.deleteRecipeInt(recipe.interactions)
                .then(() => adminDAO.updateForRecipeDelete(recipe.author, recipeId))
                .then(() => recipeModel.deleteOne({ _id: recipeId }))
                .then(() => findAllRecipes());
        });
};

module.exports = {
    findAllRecipes,
    findRecipeById,
    searchRecipeByTitle,
    createRecipe,
    updateRecipe,
    likeRecipe,
    unlikeRecipe,
    deleteRecipe
};