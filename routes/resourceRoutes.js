var express = require("express");
var resourceRoutes = express.Router();
var Resource = require("../models/resource");

resourceRoutes.route("/")
    .get(function (req, res) {
        Resource.find(function (err, resources) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(resources);
            }
        });
    })
    .post(function (req, res) {
        var newResource = new Resource(req.body);
        newResource.save(function (err, newResource) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(newResource);
            }
        });
    });

resourceRoutes.route("/bytopicid/:topicId")
    .get(function (req, res) {
        Resource
        .find({topic: req.params.topicId})
        .populate('ratings')
        .exec(function (err, resources) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(resources)
            }
        });
    });

resourceRoutes.route("/:id")
    .get(function (req, res) {
        Resource.findById(req.params.id, function (err, resourceObj) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(resourceObj);
            }
        })
    })
    .put(function (req, res) {
        Resource.findByIdAndUpdate(req.params.id, req.body, function(err, updatedResource) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(updatedResource);
            }
        })
    })
    .delete(function (req, res) {
        Resource.findByIdAndRemove(req.params.id, function(err, deletedResource) {
            if(err) {
                res.status(500).send(err);
            } else {
                var responseObj = {
                    success: true,
                    message: "successfully deleted resource",
                    resource: deletedResource
                }
                res.send(responseObj);
            }
        })
    });

module.exports = resourceRoutes;