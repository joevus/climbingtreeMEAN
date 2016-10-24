var express = require("express");
var ratingRoutes = express.Router();
var Rating = require("../models/rating");
var Resource = require("../models/resource");

ratingRoutes.route("/:resourceId")
    .get(function (req, res) {
        Rating.find({resourceId: req.params.resourceId}, function(err, ratings) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(ratings);
            }
        })
    });

ratingRoutes.route("/")
    .get(function (req, res) {
        Rating.find({}, function(err, ratings) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(ratings);
            }
        });
    });

module.exports = ratingRoutes;