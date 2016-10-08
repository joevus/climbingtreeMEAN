var app = angular.module("TreeApp");

app.service("ResourceService", ["$http", "$location", "TopicService", function ($http, $location, TopicService) {
    var self = this;
    
    this.resourceList = [];

    this.getResources = function() {
        $http.get("/api/resources/bytopicid/" + TopicService.currentTopic.id).then(function(response) {
            self.resourceList = response.data;
        });
    };

}]);