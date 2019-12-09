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

    app.put("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        const following = req.query.following;
        const unfollows = req.query.unfollows;
        if (following) {
            userDAO.follow(userId, following)
                .then(response => res.json(response));
        } else if (unfollows) {
            userDAO.unfollow(userId, unfollows)
                .then(response => res.json(response));
        } else {
            const user = req.body;
            userDAO.updateUser(userId, user)
                .then(response => res.json(response));
        }
    });

    app.delete("/api/users/:userId", (req, res) => {
        const userId = req.params.userId;
        userDAO.deleteUser(userId)
            .then(response => res.json(response));
    });
};