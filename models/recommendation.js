var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecommendationSchema = new Schema({
    address: {
        type: String,
        require: true
    },
    reason: String
});

module.exports = mongoose.model("Recommendation", RecommendationSchema);