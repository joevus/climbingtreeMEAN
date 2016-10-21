var express = require("express");
var commentAuthRoutes = express.Router();
var Comment = require("../models/comment");

commentAuthRoutes.route("/:resourceId")
    .post(function(req, res) {
        var newComment = new Comment(req.body);
        newComment.resourceId = req.params.resourceId;
        newComment.save(function(err, newComment) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(newComment);
            }
        });
    });

commentAuthRoutes.route("/deletebyid/:commentId")
    .delete(function(req, res) {
        Comment.findByIdAndRemove(req.params.commentId, function(err, deletedComment) {
            if(err) {
                res.status(500).send(err);
            } else {
                var obj = {};
                obj.message = "comment successfully deleted.";
                obj.deletedComment = deletedComment;
                res.send(obj);
            }
        });
    });

module.exports = commentAuthRoutes;