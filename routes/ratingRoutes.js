//var express = require("express");
//var ratingRoutes = express.Router();
//var Rating = require("../models/rating");
//
//ratingRoutes.route("/")
//    .get(function (req, res) {
//        Rating.find(function(err, ratings) {
//            if(err) {
//                res.status(500).send(err);
//            } else {
//                res.send(ratings);
//            }
//        })
//    })
//    .post(function (req, res) {
//        var newRating = new Rating(req.body);
//        newRating.save(function(err, newRating){
//            if(err) {
//                res.status(500).send(err);
//            } else {
//                res.send(newRating);
//            }
//        });
//    });
//
//module.exports = ratingRoutes;