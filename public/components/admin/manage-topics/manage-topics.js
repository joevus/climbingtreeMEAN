var app = angular.module("TreeApp");

app.controller("ManageTopicsCtrl", ["$scope", "TopicService", function($scope, TopicService) {
    TopicService.getAllAndParents().then(function(response) {
        $scope.allTopics = response.data;
    });
    
    TopicService.getAllTopics().then(function(response) {
        $scope.parentTopics = response.data;
    });
}]);