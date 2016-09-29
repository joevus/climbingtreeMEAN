var app = angular.module("TreeApp");

app.controller("TopicsController", ["$scope", "TopicService", "$location", function($scope, TopicService, $location){
    
    $scope.TopicService = TopicService;
    
    // get topic parent name from route using regEx
    var regexp = /topics\/(.*)/;
    var match = regexp.exec($location.path());
    console.log(match[1]);
    // update topicList based on topic parent name
    TopicService.beginTopics(match[1]);
    
    
}]);