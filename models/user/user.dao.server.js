const userModel = require('./user.model.server');
const recipeDAO = require('../recipe/recipe.dao.server');
const commentDAO = require('../comment/comment.dao.server');

const findAllUsers = () => {
    return userModel.find();
};

const findUserById = userId => {
    return userModel.findById(userId)
        .then(user => {
            return userModel.find({ _id: { $in: user.followers } }, '_id username firstName lastName')
                .then(followers => {

            return userModel.find({ _id: { $in: user.following } }, '_id username firstName lastName')
                .then(following => {

            return recipeDAO.findAllRecipesIn(user.likedRecipes)
                .then(likedRecipes => {

            return commentDAO.findAllCommentsIn(user.comments)
                .then(comments => {
                    return {
                        _id: user._id,
                        firstName: (user.firstName) ? user.firstName : "",
                        lastName: (user.lastName) ? user.lastName : "",
                        username: (user.username) ? user.username : "",
                        password: (user.password) ? user.password : "",
                        followers: followers,
                        following: following,
                        email: (user.email) ? user.email : [],
                        diets: (user.diets) ? user.diets : [],
                        likedRecipes: likedRecipes,
                        comments: comments,
                        __v: user.__v
                    };
                });
                });
                });
                });
        });
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