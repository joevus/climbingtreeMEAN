var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecommendationSchema = new Schema({
    address: {
        type: String,
        require: true
    },
    reason: String,
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Recommendation", RecommendationSchema);