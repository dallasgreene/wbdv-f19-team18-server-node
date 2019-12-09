const mongoose = require('mongoose');
const commentSchema = require('./comment.schema.server');
const commentModel = mongoose.model('CommentModel', commentSchema);

const findAllComments = () => {
    return commentModel.find({ }, '_id recipe postedBy title body');
};

const findCommentById = commentId => {
    return commentModel.findById(commentId)
        .populate('parent', '_id postedBy title body')
        .populate('postedBy', '_id username firstName lastName')
        .populate('children');
};

const createComment = comment => {
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