const userModel = require('./user.model.server');

const findAllUsers = () => {
    return userModel.find();
};

const findUserById = userId => {
    return userModel.findById(userId);
};

const findUserByUsername = username => {
    return userModel.findOne({ username: username });
};

const createUser = user => {
    return userModel.create(user);
};

const updateUser = (userId, user) => {
    return userModel.updateOne({ _id: userId }, { $set: user })
        .then(() => findUserById(userId))
        .catch(() => { return { status: "incorrect user id" } });
};

const deleteUser = userId => {
    return userModel.deleteOne({ _id: userId })
        .then(() => findAllUsers())
        .catch(() => { return { status: "incorrect user id" } });
};

module.exports = {
    findAllUsers,
    findUserById,
    findUserByUsername,
    createUser,
    updateUser,
    deleteUser
};