var app = angular.module("TreeApp");

app.service("TopicService", ["$http", function($http){
    var self = this;
    this.topicList = [];
    
    this.beginTopics = function(parentName) {
        $http.get("/api/topics/byname/" + parentName).then(function(response) {
            self.topicList.push(response.data);
        });
    };
    
}]);