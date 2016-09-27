var app = angular.module("TreeApp", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html",
            controller: "HomeController"
        })
}]);