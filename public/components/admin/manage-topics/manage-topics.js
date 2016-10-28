var app = angular.module("TreeApp");

app.controller("ManageTopicsCtrl", ["$scope", "TopicService", function($scope, TopicService) {
    TopicService.getAllAndParents().then(function(response) {
        $scope.allTopics = response.data;
    });
    
    TopicService.getAllTopics().then(function(response) {
        $scope.parentTopics = response.data;
    });
    
    $scope.deleteTopic = function(topic) {
        var confirm = window.confirm("Are you sure you want to delete this topic?");
        if(confirm) {
            TopicService.deleteTopic(topic).then(function(response) {
                
                // refresh topic lists
                TopicService.getAllAndParents().then(function(response) {
                    $scope.allTopics = response.data;
                });

                TopicService.getAllTopics().then(function(response) {
                    $scope.parentTopics = response.data;
                });
                
            });
        }
    };
    
    $scope.updateTopic = function(topic) {
        var confirm = window.confirm("Are you sure you want to update this topic?");
        if(confirm) {
            topic.editing = false;
            topic.parent = topic.newParentId;
            TopicService.updateTopic(topic).then(function(response) {
                
                // refresh topic lists
                TopicService.getAllAndParents().then(function(response) {
                    $scope.allTopics = response.data;
                });

                TopicService.getAllTopics().then(function(response) {
                    $scope.parentTopics = response.data;
                });
                
            });
        }
    };
}]);