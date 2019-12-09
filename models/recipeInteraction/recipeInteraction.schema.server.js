const mongoose = require('mongoose');
const recipeInteractionSchema = mongoose.Schema({
    recipe: String,
    likedBy: [String],
    comments: [String]
}, { collection: 'recipeInteraction' });

module.exports = recipeInteractionSchema;