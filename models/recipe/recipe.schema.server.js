const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
        title: String,
        image: String,
        instructions: String,
        servings: Number,
        readyInMinutes: Number,
        preparationMinutes: Number,
        cookingMinutes: Number,
        diets: [String],
        interactions: { type: mongoose.Types.ObjectId, ref: 'RecipeInteractionModel' }
    }, { collection: 'recipe' });

recipeSchema.index({ title: 1 });

module.exports = recipeSchema;