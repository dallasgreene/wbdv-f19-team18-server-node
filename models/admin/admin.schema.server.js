const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
        createdRecipes: [String]
    }, { discriminatorKey: 'type' });

module.exports = adminSchema;