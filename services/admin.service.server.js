const adminDAO = require('../models/admin/admin.dao.server');

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
        const admin = req.body;
        adminDAO.updateAdmin(adminId, admin)
            .then(response => res.json(response));
    });

    app.delete("/api/admins/:adminId", (req, res) => {
        const adminId = req.params.adminId;
        adminDAO.deleteAdmin(adminId)
            .then(response => res.json(response));
    });
};