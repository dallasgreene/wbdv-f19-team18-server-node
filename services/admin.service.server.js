const adminDAO = require('../models/admin/admin.dao.server');
const userDAO = require('../models/user/user.dao.server');

module.exports = app => {
    app.get("/api/admins", (req, res) => {
        adminDAO.findAllAdmins()
            .then(response => res.json(response));
    });

    app.get("/api/admins/:adminId", (req, res) => {
        const adminId = req.params.adminId;
        adminDAO.findAdminById(adminId)
            .then(response => res.json(response));
    });

    app.post("/api/admins", (req, res) => {
        const admin = req.body;
        adminDAO.createAdmin(admin)
            .then(response => res.json(response));
    });

    app.put("/api/admins/:adminId", (req, res) => {
        const adminId = req.params.adminId;
        const following = req.query.following;
        const unfollows = req.query.unfollows;
        if (following) {
            userDAO.follow(adminId, following)
                .then(response => res.json(response));
        } else if (unfollows) {
            userDAO.unfollow(adminId, unfollows)
                .then(response => res.json(response));
        } else {
            const admin = req.body;
            adminDAO.updateAdmin(adminId, admin)
                .then(response => res.json(response));
        }
    });

    app.delete("/api/admins/:adminId", (req, res) => {
        const adminId = req.params.adminId;
        userDAO.deleteAdmin(adminId)
            .then(response => res.json(response));
    });
};