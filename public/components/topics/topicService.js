var app = angular.module("TreeApp");

app.service("TopicService", ["$http", "$location", "DrawingService", "ResourceService", "$routeParams", function ($http, $location, DrawingService, ResourceService, $routeParams) {
    var self = this;

//    this.currentTopic = {};
    
    // set current topic using $routeParams
    this.setCurrentTopic = function(topicId) {
        $http.get("/api/topics/" + topicId).then(function(response) {
            self.currentTopic = response.data; 
            // find resources associated with current topic
            ResourceService.getResources(self.currentTopic);
            // get children topics and clear canvas
            self.getTopics(self.currentTopic);
        });
    };
    
    // set STEM topic
    this.setSTEMTopic = function() {
        $http.get("api/topics/" + "57f5493d014f140d5c4ffff6").then(function(response) {
            self.currentTopic = response.data;
            ResourceService.getResources(self.currentTopic);
        });
    };
    
    this.topicList = [];
    
    // get topic by name
    this.getTopicByName = function(name) {
        return $http.get("/api/topics/topicbyname/" + name).then(function(response){
            return response.data;
        });
    }

    // for updating topics on click
    this.getTopics = function (topic) {
        DrawingService.clearCanvas();
        
        self.currentTopic = topic;
        $http.get("/api/topics/childrenbyid/" + topic._id).then(function (response) {
            var children = response.data;
            var newList = [];
            for (var i = 0; i < children.length; i++) {
                newList.push(children[i]);
            }
            self.topicList = newList;
        });
    };

    // for navigating up
    this.navUp = function (topic) {
        // clear topicList. Adding this line fixed bug: I would navigate up from Science to STEM then down to Technology and a line would remain drawn from the Science page.
        self.topicList = [];
        
        DrawingService.clearCanvas();

        // if reached the top of tree go to home (STEM) screen
        if (topic.parent === "57f5493d014f140d5c4ffff6") {
            $location.path("/");
            
            // set the current topic
        } else {
            // otherwise, navigate up
            $location.path("/topics/" + topic.parent);

        }
        
    };
    
    // for admin managing topics
    this.getAllTopics = function() {
        return $http.get("/api/topics/");
    }

}]);