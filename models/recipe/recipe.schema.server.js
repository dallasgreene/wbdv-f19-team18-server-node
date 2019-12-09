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
        interactions: String
    }, { collection: 'recipe' });

module.exports = recipeSchema;