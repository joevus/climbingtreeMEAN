var app = angular.module("TreeApp");

app.controller("SubmitResourceCtrl", ["$scope", "SubmitService", "$timeout", "UserService", function ($scope, SubmitService, $timeout, UserService) {
    
    // for submission success message
    $scope.recentSubmission = false;
    $scope.resetSubmission = function() {
        $scope.recentSubmission = false;
    }
    
    $scope.submitRecommendation = function (recommendation) {
        SubmitService.submitRecommendation(recommendation).then(function (response) {
            // clear form
            $scope.recommendation = {};
            $scope.recentSubmission = true;
            $timeout($scope.resetSubmission, 5000);
        });
    }
    
    $scope.UserService = UserService;

}]);