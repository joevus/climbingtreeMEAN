var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var config = require("./config");
var expressJwt = require("express-jwt");

var port = process.env.PORT || 8000;

mongoose.connect(config.database, function() {
    console.log("Database is connected");
});


// Middleware \\
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes \\
app.use("/auth", require("./routes/authRoutes.js"));
app.use("/api/auth", expressJwt({secret: config.secret}));
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/auth/resources", require("./routes/resourceAuthRoutes"));
app.use("/api/topics", require("./routes/topicRoutes"));
app.use("/api/auth/topics", require("./routes/topicAuthRoutes"));
app.use("/api/ratings", require("./routes/ratingRoutes"));
app.use("/api/auth/ratings", require("./routes/ratingAuthRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/auth/comments", require("./routes/commentAuthRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));
app.use("/api/auth/recommendations", require("./routes/recommendationAuthRoutes"));

// Have express serve up static files
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, function(){
    console.log("server listening on port: " + port);
});