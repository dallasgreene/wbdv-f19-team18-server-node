const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);

const findAllUsers = () => {
    return userModel.find();
};

const findUserById = userId => {
    return userModel.find({ _id: userId });
};

module.exports = userModel;