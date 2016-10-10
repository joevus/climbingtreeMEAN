var app = angular.module("TreeApp");

app.service("TopicService", ["$http", "$location", "DrawingService", "ResourceService", function ($http, $location, DrawingService, ResourceService) {
    var self = this;

    this.currentTopic = {};
    
    // set current topic
    this.setCurrentTopic = function() {
        var regexp = /topics\/(.*)/;
        var match = regexp.exec($location.path());
        self.currentTopic.name = match[1];
    }
    
    this.topicList = [];

    // for updating topics when first get to topics page
    this.beginTopics = function () {
        
        $http.get("/api/topics/childrenbyname/" + self.currentTopic.name).then(function (response) {
            self.currentTopic = response.data;
            
            var children = response.data.children;
            var newList = [];
            for (var i = 0; i < children.length; i++) {
                newList.push(children[i]);
            }
            self.topicList = newList;
            // find resources associated with current topic
            ResourceService.getResources(self.currentTopic);
        });
    };

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
            
            // find resources associated with current topic
            ResourceService.getResources(self.currentTopic);
        });
    }

    // for navigating up
    this.navUp = function (topic) {
        // clear topicList. Before adding this line, I would navigate up from Science to STEM then down to Technology and a line would remain drawn from the Science page.
        self.topicList = [];
        
        DrawingService.clearCanvas();

        // if reached the top of tree go to home (STEM) screen
        if (topic.parent === "57f5493d014f140d5c4ffff6") {
            $location.path("/");
        } else {
            // otherwise, navigate up
            $http.get("/api/topics/childrenbyid/" + topic.parent).then(function (response) {
                var children = response.data;
                var newList = [];
                for (var i = 0; i < children.length; i++) {
                    newList.push(children[i]);
                }
                self.topicList = newList;
            });

            $http.get("/api/topics/" + topic.parent).then(function (response) {
                self.currentTopic = response.data;
                
                // find resources associated with current topic
                ResourceService.getResources(self.currentTopic);
            });
        }


    }

}]);