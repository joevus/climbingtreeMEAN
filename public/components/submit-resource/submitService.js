var app = angular.module("TreeApp");

app.service("SubmitService", ["$http", function($http) {
    var self = this;
    
    this.submitRecommendation = function(recommendation) {
        return $http.post("/api/auth/recommendations", recommendation);
    };
}]);