var app = angular.module("TreeApp");

app.controller("ResourcePageCtrl", ["$scope", "ResourceService", "TopicService", function($scope, ResourceService, TopicService) {
    ResourceService.setCurrentResource().then(function(response) {
        $scope.resource = response;
        // check if current topic is set, if not set it
        $scope.currentTopic = TopicService.currentTopic || TopicService.setCurrentTopic($scope.resource.topic);
    });
    
    $scope.TopicService = TopicService;
    
    $scope.backLink = "#/topics/" + $scope.currentTopic;
}]);