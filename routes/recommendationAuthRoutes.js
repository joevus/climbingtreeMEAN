var express = require('express');
var recommendationAuthRoutes = express.Router();
var Recommendation = require('../models/recommendation');

recommendationAuthRoutes.route("/")
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

module.exports = recommendationAuthRoutes;