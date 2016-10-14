var app = angular.module("TreeApp");

app.service("ResourceService", ["$http", "$location", "$routeParams", function ($http, $location, $routeParams) {
    var self = this;
    
    this.resourceList = [];
    this.currentResource = {};

    this.getResources = function(topic) {
        
        $http.get("/api/resources/bytopicid/" + topic._id).then(function(response) {
            self.resourceList = response.data;
        });
    };
    
    this.setCurrentResource = function() {
        return $http.get("/api/resources/" + $routeParams.resourceId).then(function(response) {
            return self.currentResource = response.data;
        });
    };
    
    // Comments \\
    
    this.commentList = [];
    
    this.getComments = function(resource) {
        $http.get("/api/comments/" + self.currentResource._id).then(function(response) {
            var comments = response.data;
            self.commentList = comments;
        });
    };
    
    // Ratings \\
    
    this.userRating = 0; // user's rating, 0 = user hasn't rated yet
    // set which star images to use based on user's rating
    this.starImg = ["star.png", "star.png", "star.png", "star.png", "star.png"];
    this.setStarImg = function(rating) {
        for(var i = 0; i < 5; i++) {
            if(i < rating) {
                self.starImg[i] = "yellowStar.png";
            }
        }
    };
    
    this.rate = function(rating) {
        var ratingObj = { stars: rating };
        $http.post("/api/ratings/" + $routeParams.resourceId, ratingObj).then(function(response) {
            self.userRating = response.data.stars;
            self.setStarImg(rating);
        });
    };

}]);