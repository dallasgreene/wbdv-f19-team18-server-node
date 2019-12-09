const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
        createdRecipes: [{ type: mongoose.Types.ObjectId, ref: 'RecipeModel' }]
    }, { discriminatorKey: 'type' });

module.exports = adminSchema;