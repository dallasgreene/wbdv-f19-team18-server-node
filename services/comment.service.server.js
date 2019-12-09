const commentDAO = require('../models/comment/comment.dao.server');

module.exports = app => {
    app.get("/api/comments", (req, res) => {
        res.json(commentDAO.findAllComments());
    });

    app.get("/api/comments/:commentId", (req, res) => {
        const commentId = req.params.commentId;
        res.json(commentDAO.findCommentById(commentId));
    });

    app.post("/api/comments", (req, res) => {
        const comment = req.body;
        res.json(commentDAO.createComment(comment));
    });

    app.put("/api/comments/:commentId", (req, res) => {
        const commentId = req.params.commentId;
        const comment = req.body;
        res.json(commentDAO.updateComment(commentId, comment));
    });

    app.delete("/api/comments/:commentId", (req, res) => {
        const commentId = req.params.commentId;
        res.json(commentDAO.deleteComment(commentId));
    });
};