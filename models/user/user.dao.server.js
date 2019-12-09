const userModel = require('./user.model.server');

const findAllUsers = () => {
    return userModel.find({ }, "_id firstName lastName username");
};

const findUserById = userId => {
    return userModel.findById(userId)
        .populate('followers', '_id username firstName lastName')
        .populate('following', '_id username firstName lastName')
        .populate('likedRecipes', '_id title image readyInMinutes servings')
        .populate('comments', '_id title body');
};

const findUserByUsername = username => {
    return userModel.findOne({ username: username })
        .populate('followers', '_id username firstName lastName')
        .populate('following', '_id username firstName lastName')
        .populate('likedRecipes', '_id title image readyInMinutes servings')
        .populate('comments', '_id title body');
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