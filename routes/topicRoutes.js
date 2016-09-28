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

module.exports = topicRoutes;