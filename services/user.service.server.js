const userDAO = require('../models/user/user.dao.server');

module.exports = app => {
    app.get("/api/users", (req, res) => {
        res.json(userDAO.findAllUsers());
    });

    app.get("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        res.json(userDAO.findUserById(userId));
    });

    app.post("/api/users", (req, res) => {
        const user = req.body;
        res.json(userDAO.createUser(user));
    });

    app.put("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        const user = req.body;
        res.json(userDAO.updateUser(userId, user));
    });

    app.get("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        res.json(userDAO.findUserById(userId));
    });
};