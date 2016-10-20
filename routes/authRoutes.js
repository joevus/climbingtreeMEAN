var express = require("express");
var authRoutes = express.Router();
var User = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require("../config");

authRoutes.post("/login", function(req, res) {
    // Try to find the user witht he submitted username
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
                    res.json({user: user.withoutPassword(), token: token, success: true, message: "Here's your token!"});
                }
            });
        }
    });
});