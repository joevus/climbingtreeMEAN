var express = require("express");
var recommendationRoutes = express.Router();
var Recommendation = require("../models/recommendation");

recommendationRoutes.route("/")
    .get(function(req, res) {
        Recommendation.find(function(err, recommendations) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(recommendations);
            }
        });
    })
    .post(function(req, res) {
        var newRecommendation = new Recommendation(req.body);    
        newRecommendation.save(function(err, newRecommendation) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(newRecommendation);
            }
        });
    });

module.exports = recommendationRoutes;