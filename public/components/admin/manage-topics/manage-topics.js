var app = angular.module("TreeApp");

app.controller("ManageTopicsCtrl", ["$scope", "TopicService", function($scope, TopicService) {
    TopicService.getAllTopics().then(function(response) {
        $scope.allTopics = response.data; 
    });
}]);