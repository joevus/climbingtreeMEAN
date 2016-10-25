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
    });

module.exports = recommendationRoutes;