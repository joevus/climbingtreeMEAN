var express = require('express');
var recommendationAuthRoutes = express.Router();
var Recommendation = require('../models/recommendation');

recommendationAuthRoutes.route("/")
    .post(function(req, res) {
        var newRecommendation = new Recommendation(req.body);
        newRecommendation.userId = req.user._id;
        newRecommendation.save(function(err, newRecommendation) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(newRecommendation);
            }
        });
    });

recommendationAuthRoutes.route("/:id")
    .delete(function(req, res) {
        Recommendation.findByIdAndRemove(req.params.id, function(err, deletedRec) {
            if(err) {
                res.status(500).send(err);
            } else {
                var messageObj = {
                    success: true,
                    message: "deleted recommendation",
                    deletedRecommendation: deletedRec
                }
                res.send(messageObj);
            }
        });
    });

module.exports = recommendationAuthRoutes;