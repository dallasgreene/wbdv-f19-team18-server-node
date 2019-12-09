const adminSchema = require('./admin.schema.server');
const userModel = require('../user/user.model.server');
const adminModel = userModel.discriminator('AdminModel', adminSchema);

const findAllAdmins = () => {
    return adminModel.find();
};

const findAdminById = adminId => {
    return adminModel.findById(adminId);
};

const findAdminByUsername = username => {
    return adminModel.findOne({ username: username });
};

const createAdmin = admin => {
    return adminModel.create(admin);
};

const updateAdmin = (adminId, admin) => {
    return adminModel.updateOne({ _id: adminId }, { $set: admin })
        .then(() => findAdminById(adminId))
        .catch(() => { return { status: "incorrect admin id" } });
};

const deleteAdmin = adminId => {
    return adminModel.deleteOne({ _id: adminId })
        .then(() => findAllAdmins())
        .catch(() => { return { status: "incorrect admin id" } });
};

module.exports = {
    findAllAdmins,
    findAdminById,
    findAdminByUsername,
    createAdmin,
    updateAdmin,
    deleteAdmin
};