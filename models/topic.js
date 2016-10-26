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

TopicSchema.methods.findParentRef = function(cb) {
    return this.model('Topic').findOne({_id: this.parent}, cb);
};

TopicSchema.methods.removeFromChildrenById = function(id, cb) {
    var index = this.children.indexOf(id);
    if(index > -1) {
        this.children.splice(index, 1);
    }
    return this.save(cb);
};

module.exports = mongoose.model("Topic", TopicSchema);