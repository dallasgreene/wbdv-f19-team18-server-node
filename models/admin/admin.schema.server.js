const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
        createdRecipes: Array
    }, { discriminatorKey: 'type' });

module.exports = adminSchema;