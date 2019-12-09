const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
        title: String,
        postedBy: { type: mongoose.Types.ObjectId, ref: 'UserModel' },
        body: String,
        children: [{ type: mongoose.Types.ObjectId, ref: 'CommentModel' }]
    }, { collection: 'comment' });

module.exports = commentSchema;