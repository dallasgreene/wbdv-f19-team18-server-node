const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    id: ObjectId,
    title: String,
    postedBy: String,
    children: Array
}, { collection: 'comment' });

module.exports = commentSchema;