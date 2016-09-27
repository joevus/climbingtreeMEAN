var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.PORT || 8000;
var path = require("path");

app.use(bodyParser.json());
app.use(morgan("dev"));

// Have express serve up static files
app.use(express.static(path.join(__dirname, "public")));

// Routes \\
app.use("api/resources", require("./routes/resourceRoutes"));

app.listen(port, function(){
    console.log("server listening on port: " + port);
});