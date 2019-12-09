const mongoose = require('mongoose');
const recipeInteractionSchema = mongoose.Schema({
    recipe: mongoose.Types.ObjectId,
    likedBy: [mongoose.Types.ObjectId],
    comments: [mongoose.Types.ObjectId]
}, { collection: 'recipeInteraction' });

module.exports = recipeInteractionSchema;