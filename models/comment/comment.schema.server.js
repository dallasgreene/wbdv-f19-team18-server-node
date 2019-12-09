const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
        recipe: { type: mongoose.Types.ObjectId, ref: 'RecipeModel' },
        parent: { type: mongoose.Types.ObjectId, ref: 'CommentModel' },
        title: String,
        postedBy: { type: mongoose.Types.ObjectId, ref: 'UserModel' },
        body: String,
        children: [{ type: mongoose.Types.ObjectId, ref: 'CommentModel' }]
    }, { collection: 'comment' });

module.exports = commentSchema;