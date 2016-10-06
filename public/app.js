var app = angular.module("TreeApp", ["ngRoute", "ui.bootstrap"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/home/home.html",
            controller: "HomeController"
        })
        .when("/topics/:mainTopic", {
            templateUrl: "components/topics/topics.html",
            controller: "TopicsController"
        })
}]);