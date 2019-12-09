const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
        title: String,
        postedBy: String,
        children: [String]
    }, { collection: 'comment' });

module.exports = commentSchema;