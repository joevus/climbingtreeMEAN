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

resourceRoutes.route("/:id")
    .get(function (req, res) {
        Resource.findById(req.params.id, function(err, resourceObj){
            if (err) {
                res.status(500).send(err);
            } else {
                res.send()
            }
        })
    })

module.exports = resourceRoutes;