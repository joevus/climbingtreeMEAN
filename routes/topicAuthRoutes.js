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
            Topic.findByIdAndUpdate(req.params.id, req.body, {new: false}, function(err, oldTopic) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    // convert both ids to strings
                    var oldParentId = "" + oldTopic.parent;
                    var newParentId = "" + req.body.parent;
                    // if parent changed, update children property of parents
                    if(newParentId !== oldParentId) {
                        // push topic id to children of new parent
                        Topic.findById(req.body.parent, function(err, newParent) {
                            if(err) {
                                res.status(500).send(err);
                            } else {
                                newParent.children.push(req.body._id);
                                newParent.save(function(err, newParent) {
                                    if(err) {
                                        res.status(500).send(err);
                                    } else {
                                        // delete topic id from children of old parent
                                        Topic.findById(oldTopic.parent, function(err, oldParent) {
                                            if(err) {
                                                res.status(500).send(err);
                                            } else {
                                                var index = oldParent.children.indexOf(oldTopic._id);
                                                oldParent.children.splice(index, 1);
                                                oldParent.save(function(err, oldParent) {
                                                   if(err) {
                                                       res.status(500).send(err);
                                                   } else {
                                                       console.log("why are you here?");
                                                       res.send({success: true, oldTopic: oldTopic, message: "updated topic, updated new parent and old parent"});
                                                   }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        // if parent did not change, send away
                        res.send({success: true, oldTopic: oldTopic, message: "updated topic"});    
                    }
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
                    // find parent of deleted topic
                    deletedTopic.findParentRef(function(err, parentTopic) {
                        // remove reference to deleted child in parentTopic
                        parentTopic.removeFromChildrenById(deletedTopic._id, function(err, parentTopic) {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                var responseObj = {
                                    success: true,
                                    message: "Successfully deleted topic and removed reference to it in parent topic.",
                                    topic: deletedTopic
                                }
                                res.send(responseObj);
                            }
                        });
                    });
                }
            });
        } else {
            // if not admin, deny request
            res.status(403).send({success: false, message: "Must be admin to delete topic."});
        }
        
    });

module.exports = topicAuthRoutes;