const mongoose = require('mongoose');
const commentSchema = require('./comment.schema.server');
const commentModel = mongoose.model('RecipeModel', commentSchema);

module.exports = commentModel;