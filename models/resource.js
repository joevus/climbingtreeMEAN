var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    avgRating: Number,
    description: String,
    url: String,
    imgUrl: String,
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'topic'
    }
});

module.exports = mongoose.model("Resource", ResourceSchema);