const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
    id: ObjectId,
    title: String,
    image: String,
    servings: Number,
    readyInMinutes: Number,
    preparationMinutes: Number,
    cookingMinutes: Number,
    diets: Array,
    instructions: String,
    likedBy: Array,
    reviews: Array
}, { collection: 'recipe' });

module.exports = recipeSchema;