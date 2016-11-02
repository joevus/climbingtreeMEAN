var app = angular.module("TreeApp");

app.controller("NavbarController", ["$scope", "$location", function($scope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
}]);

app.directive("navbar", ["UserService", function(UserService) {
    return {
        templateUrl: "components/navbar/navbar.html",
        link: function(scope) {
            scope.userService = UserService;
        },
        controller: "NavbarController"
    }
}]);