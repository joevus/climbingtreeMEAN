var express = require("express");
var ratingRoutes = express.Router();
var Rating = require("../models/rating");

ratingRoutes.route("/:resourceId")
    .get(function (req, res) {
        Rating.find({resourceId: req.params.resourceId}, function(err, ratings) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(ratings);
            }
        })
    })
    .post(function (req, res) {
        var newRating = new Rating(req.body);
        newRating.resourceId = req.params.resourceId;
        newRating.save(function(err, newRating){
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(newRating);
            }
        });
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