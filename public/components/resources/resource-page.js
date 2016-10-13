var app = angular.module("TreeApp");

app.controller("ResourcePageCtrl", ["$scope", "ResourceService", "TopicService", function($scope, ResourceService, TopicService) {
    $scope.TopicService = TopicService;
    $scope.backLink = "#/topics/" + TopicService.currentTopic._id;
}]);