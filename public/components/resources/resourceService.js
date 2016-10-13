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

}]);