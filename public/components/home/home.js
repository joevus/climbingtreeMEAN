var app = angular.module("TreeApp");

app.controller("HomeController", ["$scope", "HomeService", "$location", function ($scope, HomeService, $location) {
    
    console.log("inside of HomeController");
    
    $scope.displayTopics = function (topicName) {
        $location.path("/topics/" + topicName);
    }
                                  
}]);