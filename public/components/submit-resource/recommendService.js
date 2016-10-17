var app = angular.module("TreeApp");

app.service("RecommendService", ["$http", function($http) {
    var self = this;
    
    this.submitRecommendation = function(recommendation) {
        $http.post("/api/")
    }
}]);