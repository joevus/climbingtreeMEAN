var app = angular.module("TreeApp");

app.controller("TopicsController", ["$scope", "TopicService", "$location", function($scope, TopicService, $location){
    
    $scope.TopicService = TopicService;
    
    // update topicList based on topic parent name
    TopicService.beginTopics();
    
    
}]);