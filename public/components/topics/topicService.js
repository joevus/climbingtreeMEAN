var app = angular.module("TreeApp");

app.service("TopicService", ["$http", "$location", "DrawingService", function($http, $location, DrawingService){
    var self = this;
    
    // set current topic
    var regexp = /topics\/(.*)/;
    var match = regexp.exec($location.path());
    this.currentTopic = {};
    this.currentTopic.name = match[1];
    
    this.topicList = [];
    
    // for updating topics when first get to topics page
    this.beginTopics = function() {        
        $http.get("/api/topics/childrenbyname/" + self.currentTopic.name).then(function(response) {
            self.currentTopic = response.data;
            var children = response.data.children;
            var newList = [];
            for(var i = 0; i < children.length; i++) {
                newList.push(children[i]);
            }
            self.topicList = newList;
        });
    };
    
    // for updating topics on click
    this.getTopics = function(topic) {
        DrawingService.clearCanvas();
        
        self.currentTopic = topic;
        $http.get("/api/topics/childrenbyid/" + topic._id).then(function(response) {
            var children = response.data;
            var newList = [];
            for(var i = 0; i < children.length; i++) {
                newList.push(children[i]);
            }
            self.topicList = newList;
        })
    }
    
}]);