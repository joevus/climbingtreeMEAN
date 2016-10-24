var express = require('express');
var ratingAuthRoutes = express.Router();
var Rating = require('../models/rating');
var Resource = require('../models/resource');

ratingAuthRoutes.route("/:resourceId")
    .post(function (req, res) {
        var newRating = new Rating(req.body);
        newRating.resourceId = req.params.resourceId;
        newRating.userId = req.user._id;
        newRating.save(function(err, newRating){
            if(err) {
                res.status(500).send(err);
            } else {
                // find relevant resource, save rating to it
                Resource.findById(req.params.resourceId, function(err, resource) {
                    if(err) {
                        res.status(500).send(err);
                    } else {
                        resource.ratings.push(newRating._id);
                        resource.save(function(err, savedResource) {
                            if(err) {
                                res.status(500).send(err);
                            } else {
                                res.send(newRating);
                            }
                        });
                    }
                });
            }
        });
    });

module.exports = ratingAuthRoutes;