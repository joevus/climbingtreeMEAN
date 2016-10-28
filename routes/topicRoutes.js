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

    });

// gets all topics, populates parents
topicRoutes.route("/populate/parents")
    .get(function(req, res) {
        Topic
        .find()
        .populate('parent')
        .exec(function(err, topics) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(topics);
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