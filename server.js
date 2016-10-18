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
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/topics", require("./routes/topicRoutes"));
app.use("/api/ratings", require("./routes/ratingRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));

mongoose.connect("mongodb://localhost/climbingtree", function() {
    console.log("Database is connected");
});

app.listen(port, function(){
    console.log("server listening on port: " + port);
});