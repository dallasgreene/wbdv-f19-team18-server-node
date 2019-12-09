const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
        createdRecipes: [mongoose.Types.ObjectId]
    }, { discriminatorKey: 'type' });

module.exports = adminSchema;