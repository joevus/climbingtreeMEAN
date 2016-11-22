var express = require("express");
var authRoutes = express.Router();
var User = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require("../config");
var ImageHost = require("../models/imagehost");

authRoutes.post("/login", function(req, res) {
    // Try to find the user with the submitted username
    User.findOne({username: req.body.username}, function(err, user) {
        if(err) res.status(500).send(err);
        
        // If that user isn't in the database:
        if(!user) {
            res.status(401).json({success: false, message: "User with the provided username was not found"})
        } else if (user) {
            user.checkPassword(req.body.password, function(err, match) {
                if(err) throw (err);
                if(!match) res.status(401).json({success: false, message: "Incorrect password"});
                else {
                    var token = jwt.sign(user.toObject(), config.secret, {expiresIn: "24h"});
                    // find upload preset for uploading images to cloudinary
                    ImageHost.findOne({service: "cloudinary"}, function(err, imagehost) {
                        if(err) res.status(500).send(err);
                        var userObj = user.withoutPassword();
                        if(user.admin) {
                            userObj.upload_preset = imagehost.upload_preset;
                        }
                        res.json({user: userObj, token: token, success: true, message: "Here's your token!"});
                    });
                    
                }
            });
        }
    });
});

authRoutes.post("/signup", function(req, res) {
    User.find({username: req.body.username}, function(err, existingUser) {
        if (err) res.status(500).send(err);
        if (existingUser.length) res.send({success: false, message: "That username is already taken."});
        else {
            var newUser = new User(req.body);
            // in case someone tried to submit themselves as admin
            newUser.admin = false;
            newUser.save(function(err, user) {
                if(err) res.status(500).send(err);
                res.send({user: user.withoutPassword(), message: "Successfully created new user.", success: true});
            });
        }
    });
});

module.exports = authRoutes;