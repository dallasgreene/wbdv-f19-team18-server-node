const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        followers: [mongoose.Types.ObjectId],
        following: [mongoose.Types.ObjectId],
        email: String,
        diets: [String],
        likedRecipes: [mongoose.Types.ObjectId],
        comments: [mongoose.Types.ObjectId]
    }, { collection: 'user', discriminatorKey: 'type' });

module.exports = userSchema;