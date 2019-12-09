const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
        title: String,
        postedBy: String,
        children: Array
    }, { collection: 'comment' });

module.exports = commentSchema;