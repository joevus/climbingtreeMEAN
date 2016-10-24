var express = require("express");
var commentRoutes = express.Router();
var Comment = require("../models/comment");

// only populate the user's id, name and date
// also, why not change the comment model to say 'user' instead of 'userId'
// populate('userId', '_id', 'name', 'date')

commentRoutes.route("/:resourceId")
    .get(function(req, res) {
        Comment
        .find({resourceId: req.params.resourceId})
        .populate('userId', '_id username')
        .exec(function(err, comments) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(comments);
            }
        });
    });

commentRoutes.route("/")
    .get(function(req, res) {
        Comment.find({}, function(err, comments) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(comments);
            }
        });
    });

module.exports = commentRoutes;