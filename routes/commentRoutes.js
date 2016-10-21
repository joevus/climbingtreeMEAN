var express = require("express");
var commentRoutes = express.Router();
var Comment = require("../models/comment");

commentRoutes.route("/:resourceId")
    .get(function(req, res) {
        Comment.find({resourceId: req.params.resourceId}, function(err, comments) {
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