var express = require("express");
var commentRoutes = express.Router();
var Comment = require("../models/comment");

commentRoutes.route("/:resourceId")
    .get(function(req, res) {
        Comment.find({resourceId: req.params.resourceId}, function(err, commentArr) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(commentArr)
            }
        });
    })
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

module.exports = commentRoutes;