var express = require('express');
var topicAuthRoutes = express.Router();
var Topic = require('../models/topic');

topicAuthRoutes.route("/")
    .post(function(req, res){
        // if admin, make new topic
        if(req.user.admin === true) {
            var newTopic = new Topic(req.body);
            // enter new topic as a child in parent
            Topic.findById(newTopic.parent, function(err, parentTopic) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    parentTopic.children.push(newTopic._id);
                    parentTopic.save(function(err, parentTopic) {
                        if(err) {
                            res.status(500).send(err);
                        } else {
                            newTopic.save(function(err, newTopic) {
                                if(err) {
                                    res.status(500).send(err);
                                } else {
                                    res.send(newTopic);
                                }
                            });
                        }
                    });
                }
            });
        } else {
            // if not admin, deny request
            res.status(403).send({success: false, message: "Must be admin to post new topic."});
        }
    });

topicAuthRoutes.route("/:id")
    .put(function (req, res) {
        // if admin, update topic
        if(req.user.admin === true) {
            Topic.findByIdAndUpdate(req.params.id, req.body, function(err, updatedTopic) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.send(updatedTopic);
                }
            });
        } else {
            // if not admin, deny request
            res.status(403).send({success: false, message: "Must be admin to update topic."})
        }
        
    })
    .delete(function(req, res) {
        // if admin, update topic
        if(req.user.admin === true) {
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
        } else {
            // if not admin, deny request
            res.status(403).send({success: false, message: "Must be admin to delete topic."});
        }
        
    });

module.exports = topicAuthRoutes;