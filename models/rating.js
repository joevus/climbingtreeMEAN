var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RatingSchema = new Schema({
    stars: Number,
    resourceId: {
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    },
//    userId: {
//        type: Schema.Types.ObjectId,
//        ref: 'User'
//    },
    date: Date
});

module.exports = mongoose.model("Rating", RatingSchema);