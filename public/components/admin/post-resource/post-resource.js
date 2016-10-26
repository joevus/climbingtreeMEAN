var app = angular.module("TreeApp");

app.controller("PostResourceCtrl", ["$scope", "SubmitService", function($scope, SubmitService) {
    SubmitService.getRecommendations().then(function(response){
       $scope.recommendations = response.data; 
    });
    
    // start Topic Type out with existing checked
    $scope.topicType = "existing";
}]);