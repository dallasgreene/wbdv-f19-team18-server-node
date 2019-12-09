const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
        id: ObjectId,
        firstName: String,
        lastName: String,
        username: String,
        followers: Array,
        following: Array,
        email: String,
        diets: Array,
        likedRecipes: Array,
        comments: Array
    }, { collection: 'user' });

module.exports = userSchema;