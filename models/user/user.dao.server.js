const userModel = require('./user.model.server');
const recipeIntDAO = require('../recipeInteraction/recipeInteraction.dao.server');
const commentDAO = require('../comment/comment.dao.server');

const findAllUsers = () => {
    return userModel.find({ }, "_id firstName lastName username");
};

const findUserById = userId => {
    return userModel.findById(userId)
        .populate('followers', '_id username firstName lastName')
        .populate('following', '_id username firstName lastName')
        .populate('likedRecipes', '_id title image readyInMinutes servings')
        .populate('comments', '_id title body')
        .catch(() => { return { status: "incorrect user id" } });
};

const findUserByUsername = username => {
    return userModel.findOne({ username: username })
        .populate('followers', '_id username firstName lastName')
        .populate('following', '_id username firstName lastName')
        .populate('likedRecipes', '_id title image readyInMinutes servings')
        .populate('comments', '_id title body')
        .catch(() => { return { status: "incorrect username" } });
};

const createUser = user => {
    return userModel.create(user);
};

const updateUser = (userId, user) => {
    return userModel.updateOne({ _id: userId }, { $set: user })
        .then(() => findUserById(userId))
        .catch(() => { return { status: "incorrect user id" } });
};

const updateForRecipeDelete = recipeId => {
    return userModel.updateMany({ }, { $pull: { likedRecipes: recipeId, comments: { recipe: recipeId } } })
};

const follow = (uid1, uid2) => {
    userModel.updateOne({ _id: uid2 }, { $push: { followers: uid1 } });
    return userModel.updateOne({ _id: uid1 }, { $push: { following: uid2 } })
        .then(() => findUserById(uid1));
};

const unfollow = (uid1, uid2) => {
    userModel.updateOne({ _id: uid2 }, { $pull: { followers: uid1 } });
    return userModel.updateOne({ _id: uid1 }, { $pull: { following: uid2 } })
        .then(() => findUserById(uid1));
};

const deleteUser = userId => {
    userModel.updateMany({ }, { $pull: { followers: userId, following: userId } });
    recipeIntDAO.updateForUserDelete(userId);
    commentDAO.deleteForUserDelete(userId);
    return userModel.deleteOne({ _id: userId })
        .catch(() => { return { status: "incorrect user id" } });
};

module.exports = {
    findAllUsers,
    findUserById,
    findUserByUsername,
    createUser,
    updateUser,
    updateForRecipeDelete,
    follow,
    unfollow,
    deleteUser
};