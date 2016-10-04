var app = angular.module("TreeApp");

app.controller("HomeController", ["$scope", "HomeService", "$location", function ($scope, HomeService, $location) {
    
    $scope.displayTopics = function (topicName) {
        $location.path("/topics/" + topicName);
    }
                                  
}]);