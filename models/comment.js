var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    body: String,
    date: {
        type: Date,
        default: Date.now
    },
    resourceId: {
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Comment", CommentSchema);