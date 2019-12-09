const adminDAO = require('../models/admin/admin.dao.server');

module.exports = app => {
    app.get("/api/admins", (req, res) => {
        res.json(adminDAO.findAllAdmins());
    });

    app.get("/api/admins/:adminId", (req, res) => {
        const adminId = req.params.adminId;
        res.json(adminDAO.findAdminById(adminId));
    });

    app.post("/api/admins", (req, res) => {
        const admin = req.body;
        res.json(adminDAO.createAdmin(admin));
    });

    app.put("/api/admins/:adminId", (req, res) => {
        const adminId = req.params.adminId;
        const admin = req.body;
        res.json(adminDAO.updateAdmin(adminId, admin));
    });

    app.delete("/api/admins/:adminId", (req, res) => {
        const adminId = req.params.adminId;
        res.json(adminDAO.deleteAdmin(adminId));
    });
};