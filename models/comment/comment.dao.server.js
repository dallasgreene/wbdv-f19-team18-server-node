const mongoose = require('mongoose');
const commentSchema = require('./comment.schema.server');
const commentModel = mongoose.model('CommentModel', commentSchema);
const userDAO = require('../user/user.dao.server');
const recipeIntDAO = require('../recipeInteraction/recipeInteraction.dao.server');

const recipePopulationSpecs = {
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
};

const findAllComments = () => {
    return commentModel.find({ }, '_id recipe postedBy title body');
};

const findCommentById = commentId => {
    return commentModel.findById(commentId)
        .populate('parent', '_id postedBy title body')
        .populate('postedBy', '_id username firstName lastName')
        .populate('children')
        .catch(() => { return { status: "incorrect comment id" } });
};

const findCommentsForRecipe = recipeId => {
    return commentModel.find({ recipe: recipeId, parent: null }, '_id children title postedBy body')
        .populate(recipePopulationSpecs);
};

const createComment = comment => {
    const updateParent = () => {
        if (comment.parent) {
            return commentModel.create(comment)
                .then(comment => {
                    return commentModel.updateOne({ _id: comment.parent }, { $push: { children: comment._id } })
                        .then(() => comment);
                });
        } else {
            return commentModel.create(comment);
        }
    };
    updateParent().then(response => {
        return userDAO.updateForCommentCreate(response.postedBy, response._id)
            .then(() => recipeIntDAO.updateForCommentCreate(response.recipe, response._id))
            .then(() => response);
    })
};

const updateComment = (commentId, comment) => {
    return commentModel.updateOne({ _id: commentId }, { $set: comment })
        .then(() => findCommentById(commentId))
        .catch(() => { return { status: "incorrect comment id" } });
};

const deleteComment = commentId => {
    commentModel.findById(commentId)
        .then(comment => {
            return commentModel.updateOne({ _id: commentId }, { $set: { title: "[Comment Deleted]", body: "" } })
                .then(() => comment.recipe);
        })
        .then(recipeId => findCommentsForRecipe(recipeId))
        .catch(() => { return { status: "incorrect comment id" } });
};

const deleteForRecipeDelete = recipeId => {
    return commentModel.deleteMany({ recipe: recipeId });
};

const deleteForUserDelete = userId => {
    return commentModel.deleteMany({ postedBy: userId });
};


module.exports = {
    findAllComments,
    findCommentById,
    findCommentsForRecipe,
    createComment,
    updateComment,
    deleteComment,
    deleteForRecipeDelete,
    deleteForUserDelete
};