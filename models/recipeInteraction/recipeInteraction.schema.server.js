const mongoose = require('mongoose');
const recipeInteractionSchema = mongoose.Schema({
    recipe: { type: mongoose.Types.ObjectId, ref: 'RecipeModel' },
    likedBy: [{ type: mongoose.Types.ObjectId, ref: 'UserModel' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'CommentModel' }]
}, { collection: 'recipeInteraction' });

module.exports = recipeInteractionSchema;