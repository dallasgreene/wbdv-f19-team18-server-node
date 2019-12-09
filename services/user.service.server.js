const userDAO = require('../models/user/user.dao.server');

module.exports = app => {
    app.get("/api/users", (req, res) => {
        userDAO.findAllUsers()
            .then(response => res.json(response));
    });

    app.get("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        userDAO.findUserById(userId)
            .then(response => res.json(response));
    });

    app.post("/api/users", (req, res) => {
        const user = req.body;
        userDAO.createUser(user)
            .then(response => res.json(response));
    });

    app.post("/api/users/:uid1/follows/:uid2", (req, res) => {
        const uid1 = req.params.uid1;
        const uid2 = req.params.uid2;
        userDAO.follow(uid1, uid2)
            .then(response => res.json(response));
    });

    app.put("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        const user = req.body;
        userDAO.updateUser(userId, user)
            .then(response => res.json(response));
    });

    app.delete("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        userDAO.deleteUser(userId)
            .then(response => res.json(response));
    });
};