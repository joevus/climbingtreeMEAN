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
        Resource
        .findById(req.params.id)
        .populate('ratings')
        .populate('topic')
        .exec(function (err, resourceObj) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(resourceObj);
            }
        });
    });

module.exports = resourceRoutes;