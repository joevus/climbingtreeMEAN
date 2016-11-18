var app = angular.module("TreeApp");

app.controller("TopicsController", ["$scope", "TopicService", "DrawingService", "$location", "$routeParams", function($scope, TopicService, DrawingService, $location, $routeParams){
    
    // set current topic
    TopicService.setCurrentTopic($routeParams.topicId);
    
    // store canvas width to use in topics.html
    var canvasContainer = document.getElementsByClassName("canvasContainer")[0];
    $scope.canvasWidth = canvasContainer.getBoundingClientRect().width;
    
    // make TopicService available on scope
    $scope.TopicService = TopicService;
    
    // test onclick
    $scope.displayTopics = function(topic) {
        $location.path("/topics/" + topic._id);
    }
    
}]);