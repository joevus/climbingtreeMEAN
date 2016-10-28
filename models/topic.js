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

TopicSchema.methods.checkForChildren = function(cb) {
    var self = this;
    this.model('Topic').find({parent: this._id}, function(err, children) {
        if (err) {
            console.log(err);
            return cb(err);
        } else {
            if(children.length > 0) self.hasChildren = true;
            else self.hasChildren = false;
            return cb;
        }
    });
};

module.exports = mongoose.model("Topic", TopicSchema);