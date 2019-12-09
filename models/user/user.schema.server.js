const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        followers: Array,
        following: Array,
        email: String,
        diets: Array,
        likedRecipes: Array,
        comments: Array
    }, { collection: 'user', discriminatorKey: 'type' });

module.exports = userSchema;