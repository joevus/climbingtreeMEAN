var app = angular.module("TreeApp");

app.controller("HomeController", ["$scope", "HomeService", "TopicService", "$location", function ($scope, HomeService, TopicService, $location) {
    // makes resources show for STEM
    TopicService.setSTEMTopic();
    
    $scope.displayTopics = function (topicName) {
        TopicService.getTopicByName(topicName).then(function(response) {
            $location.path("/topics/" + response._id);
        });
        
    }
                                  
}]);