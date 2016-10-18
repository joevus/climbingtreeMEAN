var app = angular.module("TreeApp");

app.controller("SubmitResourceCtrl", ["$scope", "SubmitService", "$timeout", function ($scope, SubmitService, $timeout) {
    
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
            console.log("$scope.recentSubmission: " + $scope.recentSubmission);
            $timeout($scope.resetSubmission, 5000);
        });
    }

}]);