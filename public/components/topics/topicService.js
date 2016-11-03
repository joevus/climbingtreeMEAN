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
        $http.get("api/topics/topicbyname/STEM").then(function(response) {
            self.currentTopic = response.data;
            ResourceService.getResources(self.currentTopic);
            //get children topics
            self.getTopics(self.currentTopic);
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
        if (topic.parent.name === "STEM") {
            $location.path("/");
            
            // set the current topic
        } else {
            // otherwise, navigate up
            $location.path("/topics/" + topic.parent._id);

        }
        
    };
    
    // Admin \\
    this.getAllTopics = function() {
        return $http.get("/api/topics/");
    };
    
    this.postTopic = function(topic) {
        return $http.post("/api/auth/topics/", topic);
    };
    
    this.getAllAndParents = function() {
        return $http.get("/api/topics/populate/parents");
    };
    
    this.deleteTopic = function(topic) {
        return $http.delete("/api/auth/topics/" + topic._id);
    };
    
    this.updateTopic = function(topic) {
        return $http.put("api/auth/topics/" + topic._id, topic);
    };

}]);