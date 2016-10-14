var app = angular.module("TreeApp");

app.controller("ResourcePageCtrl", ["$scope", "ResourceService", "TopicService", function($scope, ResourceService, TopicService) {
    ResourceService.setCurrentResource().then(function(response) {
        $scope.resource = response;
        
        // check if current topic is set, if not set it
        $scope.currentTopic = TopicService.currentTopic || TopicService.setCurrentTopic($scope.resource.topic);
        
        // get comments
        ResourceService.getComments($scope.resource);
    });
    
    // enables comments to show in ng-repeat
    $scope.ResourceService = ResourceService;
    
    $scope.TopicService = TopicService;
    
    $scope.backLink = "#/topics/" + $scope.currentTopic;
}]);