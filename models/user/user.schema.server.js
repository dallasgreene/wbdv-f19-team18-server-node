const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        followers: [{ type: mongoose.Types.ObjectId, ref: 'UserModel' }],
        following: [{ type: mongoose.Types.ObjectId, ref: 'UserModel' }],
        email: String,
        diets: [String],
        likedRecipes: [{ type: mongoose.Types.ObjectId, ref: 'RecipeModel' }],
        comments: [{ type: mongoose.Types.ObjectId, ref: 'CommentModel' }]
    }, { collection: 'user', discriminatorKey: 'type' });

module.exports = userSchema;