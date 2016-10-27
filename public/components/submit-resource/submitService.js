var app = angular.module("TreeApp");

app.service("SubmitService", ["$http", function($http) {
    var self = this;
    
    this.submitRecommendation = function(recommendation) {
        return $http.post("/api/auth/recommendations", recommendation);
    };
    
    this.getRecommendations = function() {
        return $http.get("/api/recommendations");
    };
    
    this.deleteRecommendation = function(recommendation) {
        return $http.delete("/api/auth/recommendations/" + recommendation._id);
    };
    
}]);