const mongoose = require('mongoose');
const commentSchema = require('./comment.schema.server');
const commentModel = mongoose.model('CommentModel', commentSchema);

const findAllComments = () => {
    return commentModel.find();
};

const findCommentById = commentId => {
    return commentModel.findById(commentId);
};

const createComment = comment => {
    return commentModel.create(comment);
};

const updateComment = (commentId, comment) => {
    return commentModel.updateOne({ _id: commentId }, { $set: comment })
        .then(() => findCommentById(commentId))
        .catch(() => { return { status: "incorrect comment id" } });
};

const deleteComment = commentId => {
    return commentModel.deleteOne({ _id: commentId })
        .then(() => findAllComments())
        .catch(() => { return { status: "incorrect comment id" } });
};


module.exports = {
    findAllComments,
    findCommentById,
    createComment,
    updateComment,
    deleteComment
};