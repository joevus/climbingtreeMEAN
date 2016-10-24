var express = require('express');
var ratingAuthRoutes = express.Router();
var Rating = require('../models/rating');
var Resource = require('../models/resource');

ratingAuthRoutes.route("/:resourceId")
    .post(function (req, res) {
        Rating.findOne({userId: req.user._id, resourceId: req.params.resourceId}, function(err, rating) {
            if(err) {
                res.status(500).send(err);
            } else if (!rating) {
                // if user hasn't rated resource, go ahead
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
            } else {
                // user has already rated resource
                res.status(403).send({message: "User already has rated this resource and cannot rate it again"});
            }
        });
        
    });

module.exports = ratingAuthRoutes;