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

    app.post("/api/users/:uid1/follows/:uid2", (req, res) => {
        const uid1 = req.params.uid1;
        const uid2 = req.params.uid2;
        res.json(userDAO.follow(uid1, uid2));
    });

    app.put("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        const user = req.body;
        res.json(userDAO.updateUser(userId, user));
    });

    app.delete("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        res.json(userDAO.deleteUser(userId));
    });
};