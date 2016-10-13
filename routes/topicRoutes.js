var express = require("express");
var Topic = require("../models/topic");
var topicRoutes = express.Router();

// get access to comments and ratings in database
var Comment = require("../models/comment");
var Rating = require("../models/rating");

topicRoutes.route("/")
    .get(function (req, res) {
        Topic.find(function (err, topics) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(topics);
            }
        });

    })
    .post(function(req, res){
        var newTopic = new Topic(req.body);
        newTopic.save(function(err, newTopic) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(newTopic);
            }
        });
    });

topicRoutes.route("/:id")
    .get(function (req, res) {
        Topic.findById(req.params.id, function(err, topicObj) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(topicObj)
            }
        });
    })
    .put(function (req, res) {
        Topic.findByIdAndUpdate(req.params.id, req.body, function(err, updatedTopic) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(updatedTopic);
            }
        })
    })
    .delete(function(req, res) {
        Topic.findByIdAndRemove(req.params.id, function(err, deletedTopic) {
            if(err) {
                res.status(500).send(err);
            } else {
                var responseObj = {
                    success: true,
                    message: "succesfully deleted topic",
                    topic: deletedTopic
                }
                res.send(responseObj);
            }
        });
    });

topicRoutes.route("/childrenbyname/:parentName")
    .get(function(req, res) {
        Topic
        .findOne({ "name": req.params.parentName })
        .populate('children')
        .exec(function(err, topics){
            if(err){
                res.status(500).send(err);
            } else {
                res.send(topics);
            }
        });
    });

topicRoutes.route("/topicbyname/:topicName")
    .get(function(req, res) {
        Topic
        .findOne({ "name": req.params.topicName }, function(err, topic){
            if(err){
                res.status(500).send(err);
            } else {
                res.send(topic);
            }
        });
    });

topicRoutes.route("/childrenbyid/:parentId")
    .get(function(req, res) {
        Topic.find({ parent: req.params.parentId}, function(err, topics) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(topics);
            }
        });
    });

module.exports = topicRoutes;