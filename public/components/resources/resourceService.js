var app = angular.module("TreeApp");

app.service("ResourceService", ["$http", "$location", function ($http, $location) {
    var self = this;
    
    this.resourceList = [];

    this.getResources = function(topic) {
        
        $http.get("/api/resources/bytopicid/" + topic._id).then(function(response) {
            self.resourceList = response.data;
        });
    };

}]);