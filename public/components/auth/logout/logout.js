var app = angular.module("TreeApp");

app.controller("LogoutController", ["UserService", function(UserService) {
    UserService.logout();
}]);