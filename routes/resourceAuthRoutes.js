var express = require("express");
var resourceAuthRoutes = express.Router();
var Resource = require("../models/resource");

// Admin only \\

resourceAuthRoutes.route("/")
    .post(function (req, res) {
        // If user is admin, save resource
        console.log(req.user);
        if(req.user.admin === true) {
            var newResource = new Resource(req.body);
            newResource.save(function (err, newResource) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send(newResource);
                }
            });
        // if user is not admin, send error
        } else {
            res.status(403).send({success: false, message: "Must be admin to post a new resource."})
        }
        
    });

resourceAuthRoutes.route("/:id")
    .put(function (req, res) {
        // if admin, update resource
        if(req.user.admin === true) {
            Resource.findByIdAndUpdate(req.params.id, req.body, function(err, updatedResource) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.send(updatedResource);
                }
            });
        } else {
            // if not admin, deny request
            res.status(403).send({success: false, message: "Must be admin to update a resource."});
        } 
    })
    .delete(function (req, res) {
        // if admin, delete resource
        if(req.user.admin === true) {
            Resource.findByIdAndRemove(req.params.id, function(err, deletedResource) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    var responseObj = {
                        success: true,
                        message: "successfully deleted resource",
                        resource: deletedResource
                    }
                    res.send(responseObj);
                }
            });
        } else {
            // if not admin, deny request
            res.status(403).send({success: false, message: "Must be admin to update a resource."});
        }
        
    });

module.exports = resourceAuthRoutes;