var app = angular.module("TreeApp");

app.service("TopicService", ["$http", function($http){
    var self = this;
    this.topicList = [];
    
    // for updating topics when first get to topics page
    this.beginTopics = function(parentName) {
        $http.get("/api/topics/childrenbyname/" + parentName).then(function(response) {
            var children = response.data.children;
            var newList = [];
            for(var i = 0; i < children.length; i++) {
                newList.push(children[i]);
            }
            self.topicList = newList;
        });
    };
    
}]);