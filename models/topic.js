var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    name: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: "Topic"
    }]
});

module.exports = mongoose.model("Topic", TopicSchema);