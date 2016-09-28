var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: String,
    url: String,
    imgUrl: String,
    topicId: {
        type: Schema.Types.ObjectId,
        ref: 'topic'
    }
});

module.exports = mongoose.model("Resource", ResourceSchema);