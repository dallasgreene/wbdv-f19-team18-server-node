const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
        title: String,
        postedBy: mongoose.Types.ObjectId,
        body: String,
        children: [mongoose.Types.ObjectId]
    }, { collection: 'comment' });

module.exports = commentSchema;