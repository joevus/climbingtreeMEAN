var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    name: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Topic"
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: "Topic"
    }]
});