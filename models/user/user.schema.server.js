const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        followers: [String],
        following: [String],
        email: String,
        diets: [String],
        likedRecipes: [String],
        comments: [String]
    }, { collection: 'user', discriminatorKey: 'type' });

module.exports = userSchema;