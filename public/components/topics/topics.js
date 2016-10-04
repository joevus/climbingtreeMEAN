var app = angular.module("TreeApp");

app.controller("TopicsController", ["$scope", "TopicService", "DrawingService", "$location", function($scope, TopicService, DrawingService, $location){
    
    // store canvas width to use in topics.html
    var canvasContainer = document.getElementsByClassName("canvasContainer")[0];
    $scope.canvasWidth = canvasContainer.getBoundingClientRect().width;
    
    $scope.TopicService = TopicService;
    
    // update topicList based on topic parent name
    TopicService.beginTopics();
    
}]);