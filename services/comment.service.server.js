const commentDAO = require('../models/comment/comment.dao.server');

module.exports = app => {
    app.get("/api/comments", (req, res) => {
        commentDAO.findAllComments()
            .then(response => res.json(response));
    });

    app.get("/api/comments/:commentId", (req, res) => {
        const commentId = req.params.commentId;
        commentDAO.findCommentById(commentId)
            .then(response => res.json(response));
    });

    app.post("/api/comments", (req, res) => {
        const comment = req.body;
        commentDAO.createComment(comment)
            .then(response => res.json(response));
    });

    app.put("/api/comments/:commentId", (req, res) => {
        const commentId = req.params.commentId;
        const comment = req.body;
        commentDAO.updateComment(commentId, comment)
            .then(response => res.json(response));
    });

    app.delete("/api/comments/:commentId", (req, res) => {
        const commentId = req.params.commentId;
        commentDAO.deleteComment(commentId)
            .then(response => res.json(response));
    });
};