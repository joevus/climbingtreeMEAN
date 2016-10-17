var express = require("express");
var recommendationRoutes = express.Router();
var Recommendation = require("../models/recommendation");

recommendationRoutes.route("/")
    .get()