var app = angular.module("TreeApp");

app.service("ResourceService", ["$http", "$location", "$routeParams", "UserObjService", "$timeout", function ($http, $location, $routeParams, UserObjService, $timeout) {
    var self = this;
    
    this.resourceList = [];
    this.currentResource = {};

    this.getResources = function(topic) {
        
        $http.get("/api/resources/bytopicid/" + topic._id).then(function(response) {
            self.resourceList = response.data;
            console.log(response.data);
        });
        
    };
    
    this.setCurrentResource = function() {
        return $http.get("/api/resources/" + $routeParams.resourceId).then(function(response) {
            return self.currentResource = response.data;
        });
    };
    
    // Admin \\
    this.postResource = function(resource) {
        return $http.post("/api/auth/resources/", resource);
    };
    
    this.getAll = function() {
        return $http.get("/api/resources");
    };
    
    this.deleteResource = function(resource) {
        return $http.delete("/api/auth/resources/" + resource._id);
    };
    
    // Comments \\
    
    this.commentList = [];
    
    this.getComments = function(resource) {
        $http.get("/api/comments/" + resource._id).then(function(response) {
            var comments = response.data;
            self.commentList = comments;
        });
    };
    
    this.postComment = function(comment) {
        return $http.post("/api/auth/comments/" + $routeParams.resourceId, comment).then(function(response) {
            self.getComments(self.currentResource);
        });
    };
    
    this.deleteComment = function(comment) {
        return $http.delete("/api/auth/comments/deletebyid/" + comment._id).then(function(response) {
            self.getComments(self.currentResource);
        });
    };
    
    // Ratings \\
    
    this.determineStar = function(resource, starNum) {
        
        // make sure resource is truthy, if not exit function
        if(!resource) {
            return;
        }
        
        var ratings = resource.ratings;
        var ratingSum = 0;
        for (var i = 0; i < ratings.length; i++) {
            ratingSum += ratings[i].stars;
        }
        var avgRating = ratingSum / ratings.length;
        console.log(avgRating);
        // if avg rating is 2.5 and we're on starNum 3, it will be yellow
        if(avgRating >= starNum - 0.5) {
            return "yellowStar.png";
        } else {
            return "star.png";
        }
    };
    
    this.userRating = 0; // user's rating, 0 = user hasn't rated yet
    
    this.setUserRating = function(resource) {
        
        // exit function if user not logged in
        if(!UserObjService.getUser()) {
            console.log("user not logged in, exiting setUserRating");
            return;
        }
        var ratings = resource.ratings;
        for (var i = 0; i < ratings.length; i++) {
            if(ratings[i].userId === UserObjService.getUser()) {
                self.userRating = ratings[i].stars;
            }
        }
        self.setUserStarImgs(self.userRating);
    };
    
    this.multipleRatingAttempt = false;
    
    this.multipleRatingReset = function() {
        self.multipleRatingAttempt = false;
    }
    
    this.multipleRatingAlert = function() {
        self.multipleRatingAttempt = true;
        $timeout(self.multipleRatingReset, 4000);
    }
    
    // set which star images to use based on user's rating
    this.userStarImg = ["star.png", "star.png", "star.png", "star.png", "star.png"];
    this.setUserStarImgs = function(rating) {
        for(var i = 0; i < 5; i++) {
            if(i < rating) {
                self.userStarImg[i] = "yellowStar.png";
            } else {
                self.userStarImg[i] = "star.png"; // in case rating changes
            }
        }
    };
    
    this.rate = function(rating) {
        // prevent user from rating more than once
        // later will rely on database for this
//        if(self.userRating > 0) {
//            return;
//        }
        
        var ratingObj = { stars: rating };
        $http.post("/api/auth/ratings/" + $routeParams.resourceId, ratingObj).then(function(response) {
            self.userRating = response.data.stars;
            self.setUserStarImgs(rating);
        }, function(response) {
            if(response.status === 403) {
                self.multipleRatingAlert();
                console.log("multipleRatingAttempt: " + self.multipleRatingAttempt);
                console.log(response.data.message);
            }
        });
    };

}]);