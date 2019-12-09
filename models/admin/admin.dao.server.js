const adminSchema = require('./admin.schema.server');
const userModel = require('../user/user.model.server');
const adminModel = userModel.discriminator('AdminModel', adminSchema);

const findAllAdmins = () => {
    return adminModel.find({ }, "_id firstName lastName username");
};

const findAdminById = adminId => {
    return adminModel.findById(adminId)
        .populate('createdRecipes', '_id title image readyInMinutes servings')
        .populate('followers', '_id username firstName lastName')
        .populate('following', '_id username firstName lastName')
        .populate('likedRecipes', '_id title image readyInMinutes servings')
        .populate('comments', '_id title body');
};

const findAdminByUsername = username => {
    return adminModel.findOne({ username: username })
        .populate('createdRecipes', '_id title image readyInMinutes servings')
        .populate('followers', '_id username firstName lastName')
        .populate('following', '_id username firstName lastName')
        .populate('likedRecipes', '_id title image readyInMinutes servings')
        .populate('comments', '_id title body');
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