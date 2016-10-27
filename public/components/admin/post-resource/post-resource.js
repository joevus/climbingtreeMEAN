var app = angular.module("TreeApp");

app.controller("PostResourceCtrl", ["$scope", "SubmitService", "TopicService", function($scope, SubmitService, TopicService) {
    SubmitService.getRecommendations().then(function(response){
       $scope.recommendations = response.data; 
    });
    
    // start Topic Type out with existing checked
    $scope.topicType = "existing";
    
    // get all topics
    TopicService.getAllTopics().then(function(response) {
       $scope.allTopics = response.data; 
    });
    
    // ng-model for resourceTopic wasn't working until I included this
    $scope.resourceTopic = {};
    
    // new topic
    $scope.newTopic = {};
}]);