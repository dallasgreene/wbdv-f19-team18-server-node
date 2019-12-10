const mongoose = require('mongoose');
const recipeInteractionSchema = require('./recipeInteraction.schema.server');
const recipeIntModel = mongoose.model('RecipeInteractionModel', recipeInteractionSchema);
const userDAO = require('../user/user.dao.server');
const commentDAO = require('../comment/comment.dao.server');

const recipePopulationSpecs = {
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
                    }     // -> only used when getting a specific interactions object in order
                }         //    to load all comments for the detail view of a recipe.
            }
        }
    }
};

const findAllRecipeInts = () => {
    return recipeIntModel.find();
};

const findRecipeIntById = recipeIntId => {
    return recipeIntModel.findById(recipeIntId);
};

const findInteractionForRecipeId = recipeId => {
    return recipeIntModel.findOne({ recipe: recipeId }, 'likedBy comments')
        .populate(recipePopulationSpecs)
        .then(response => {
            if (response) return response;
            return recipeIntModel.create({
                recipe: recipeId,
                likedBy: [],
                comments: []
            })
        })
};

const createRecipeInt = recipeInteraction => {
    return recipeIntModel.create(recipeInteraction);
};

const updateRecipeInt = (recipeIntId, recipeInteraction) => {
    return recipeIntModel.updateOne({ _id: recipeIntId }, { $set: recipeInteraction })
        .then(() => findRecipeIntById(recipeIntId))
        .catch(() => { return { status: "incorrect recipeInteraction id" } });
};

const updateForCommentCreate = (recipeId, commentId) => {
    return recipeIntModel.updateOne({ recipe: recipeId }, { $push: { comments: commentId } })
};

const updateForUserDelete = userId => {
    return recipeIntModel.updateMany({ }, { $pull: { likedBy: userId } })
};

const likeRecipe = (recipeId, userId) => {
    return recipeIntModel.updateOne({ recipe: recipeId }, { $push: { likedBy: userId } })
};

const unlikeRecipe = (recipeId, userId) => {
    return recipeIntModel.updateOne({ recipe: recipeId }, { $pull: { likedBy: userId } })
};

const deleteRecipeInt = recipeIntId => {
    return recipeIntModel.findById(recipeIntId)
        .then(recipeInteraction => {
            userDAO.updateForRecipeDelete(recipeInteraction.recipe);
            commentDAO.deleteForRecipeDelete(recipeInteraction.recipe);
            return recipeIntModel.deleteOne({ _id: recipeIntId });
        })
        .catch(() => { return { status: "incorrect recipeInteraction id" } });
};

module.exports = {
    findAllRecipeInts,
    findRecipeIntById,
    findInteractionForRecipeId,
    createRecipeInt,
    updateRecipeInt,
    updateForCommentCreate,
    updateForUserDelete,
    likeRecipe,
    unlikeRecipe,
    deleteRecipeInt
};